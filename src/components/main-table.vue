<template>
  <b-container fluid>
    <div class="home">
      <h3 class="heading"></h3>
      <div>
        <b-row>
          <b-col lg="6" class="my-1">
            <b-form-group
              label="Filter"
              label-cols-sm="3"
              label-align-sm="right"
              label-size="sm"
              label-for="filterInput"
              class="mb-0"
            >
              <b-input-group size="sm">
                <b-form-input
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="Type to Search"
                ></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">
                    Clear
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col lg="2" class="my-1"></b-col>
        </b-row>
        <b-row>
          <b-col sm="5" md="6" class="my-1">
            <b-form-group
              label="Per page"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-align-sm="right"
              label-size="sm"
              label-for="perPageSelect"
              class="mb-0"
            >
              <b-form-select
                v-model="perPage"
                id="perPageSelect"
                size="sm"
                :options="pageOptions"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="5" md="6" class="my-1">
            <b-form-group
              label="Total rows"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-align-sm="right"
              label-size="sm"
              class="mb-0"
            >
              <p class="my-1">
                {{ totalRows }}
              </p>
            </b-form-group>
          </b-col>
        </b-row>
      </div>
      <b-col sm="3" md="3" class="my-1 float-right">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          size="sm"
          align="fill"
          class="my-0"
        ></b-pagination>
      </b-col>

      <div style="float: left">
        <b-button size="sm" @click="addNewItem">Add New</b-button>
      </div>
      <b-table
        ref="mytable"
        striped
        hover
        bordered
        selectable
        editable
        select-mode="single"
        head-variant="dark"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered"
      >
        <template v-slot:cell(actions)="data">
          <b-icon
            icon="pencil-square"
            aria-hidden="false"
            @click="editItem(data)"
            class="mr-2"
          ></b-icon>
          <b-icon
            variant="danger"
            icon="trash-fill"
            aria-hidden="false"
            @click="deleteItem(data)"
            class="mr-2"
          ></b-icon>
        </template>
        <template v-slot:cell(name)="data">
          <!-- `data.value` is the value after formatted by the Formatter -->
          <a :href="`#${data.value.replace(/[^a-z]+/i, '-').toLowerCase()}`">
            {{ data.value }}
          </a>
        </template>
      </b-table>

      <AddNew :userId="userId" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xl">
          <img src="@/assets/img1.jpg" alt="..." class="img-thumbnail" />
        </div>
        <div class="col-xl">
          <img src="@/assets/img2.jpg" alt="..." class="img-thumbnail" />
        </div>
        <div class="col-xl">
          <img src="@/assets/img3.jpg" alt="..." class="img-thumbnail" />
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import moment from "moment";
import AddNew from "./add-new.vue";

export default {
  components: { AddNew },
  data() {
    return {
      items: null,
      fields: [
        {
          key: "startDate",
          label: "Pain start date",
          sortable: true,
          sortDirection: "desc",
          editable: true,
          formatter: (value) => {
            return moment(value).format("DD.MM.YYYY");
          },
        },
        {
          key: "startTime",
          label: "Pain start time",
          sortable: true,
          sortDirection: "desc",
          editable: true,
        },
        {
          key: "endDate",
          label: "Pain end date",
          sortable: true,
          editable: true,
          formatter: (value) => {
            return moment(value).format("DD.MM.YYYY");
          },
        },
        {
          key: "endTime",
          label: "Pain end time",
          sortable: true,
          sortDirection: "desc",
          editable: true,
        },
        {
          key: "painStrength",
          label: "Pain strength",
          sortable: true,
          editable: true,
        },
        {
          key: "painPosition",
          label: "Pain position",
          sortable: true,
          editable: true,
        },
        {
          key: "painReason",
          label: "Pain reason",
          sortable: true,
          editable: true,
        },
        {
          key: "painSimptoms",
          label: "Simptoms",
          sortable: true,
          editable: true,
        },
        {
          key: "dailyActivityImpact",
          label: "Daily activity impact",
          sortable: true,
          editable: true,
        },
        {
          key: "medicationFrequency",
          label: "Medication frequency",
          sortable: true,
          editable: true,
        },
        { key: "actions", class: "text-center" },
      ],
      currentPage: 1,
      totalRows: 0,
      perPage: 30,
      sortBy: "",
      sortDesc: true,
      sortDirection: "desc",
      filter: null,
      filterOn: [],
      pageOptions: [5, 10, 20, 30],
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    this.$root.$on("newData", async () => {
      await this.refreshData();
    });
  },
  async created() {
    await this.refreshData();
  },
  props: {
    userId: String,
  },
  methods: {
    async refreshData() {
      await this.getPainDiaryData();
      this.totalRows = this.items.length;
    },
    async deleteItem(data) {
      await this.deletePainDiaryData(data.item._id).catch((err) => {
        console.log("err", err);
      });
    },

    addNewItem() {
      this.$root.$emit("onAdd", {});
      this.$bvModal.show("addNew");
    },
    editItem(data) {
      this.$root.$emit("onEdit", Object.assign({}, data.item));
      this.$bvModal.show("addNew");
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async deletePainDiaryData(itemId) {
      try {
        let response = await this.$http.delete(
          `/pain-diary/${this.userId}/item/${itemId}`
        );

        if (response.status == 200) {
          this.makeToast("success", "Item successfully deleted!");
          await this.refreshData();
        } else {
          this.makeToast("danger", "Something went wrong while getting data!");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async getPainDiaryData() {
      try {
        let response = await this.$http.get(`/pain-diary/${this.userId}`);

        if (response.data) {
          this.items = response.data;
          this.items.reverse();

          return response.data;
        } else {
          this.makeToast("danger", "Something went wrong while getting data!");
        }
      } catch (err) {
        console.log(err);
      }
    },
    makeToast(variant = "default", bodyContent) {
      this.$bvToast.toast(bodyContent, {
        title: "Success",
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>
<style>
.img-thumbnail {
  margin: 50px;
  padding: 0.25rem;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  max-width: 100% !important;
  height: 70% !important;
}
.page-link {
  position: relative;
  display: block;
  color: #262626 !important;
  border: 1px solid #262626 !important;
}
.page-link:hover {
  z-index: 2;
  color: #fff !important;
  text-decoration: none;
  background-color: #a4a4a4 !important;
  border-color: #dee2e6;
}
.page-item.active .page-link {
  z-index: 3;
  color: #fff;
  background-color: #808080 !important;
  border-color: #353535;
}
</style>
