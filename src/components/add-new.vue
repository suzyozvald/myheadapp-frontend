<template>
  <div>
    <b-modal id="addNew" title="Glavobolja">
      <b-form @submit.prevent="submitForm">
        <b-form-group label="Početak glavobolje" label-for="startDate">
          <b-row>
            <b-col>
              <b-form-datepicker
                locale="hr-HR"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
                v-model="headpain.startDate"
                class="mb-1"
                :state="validateState('startDate')"
                aria-describedby="input-2-live-feedback"
              ></b-form-datepicker>
              <b-form-invalid-feedback id="input-2-live-feedback">
                This is a required field.
              </b-form-invalid-feedback>
            </b-col>
            <b-col>
              <b-form-timepicker
                v-model="headpain.startTime"
                locale="hr"
                :state="validateState('startTime')"
                aria-describedby="input-2-live-feedback"
              ></b-form-timepicker>
              <b-form-invalid-feedback id="input-2-live-feedback">
                This is a required field.
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
        </b-form-group>
        <b-form-group label="Kraj glavobolje" label-for="endDate">
          <b-row>
            <b-col>
              <b-form-datepicker
                locale="hr-HR"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
                v-model="headpain.endDate"
                class="mb-1"
                :state="validateState('endDate')"
                aria-describedby="input-2-live-feedback"
              ></b-form-datepicker>
              <b-form-invalid-feedback id="input-2-live-feedback">
                This is a required field.
              </b-form-invalid-feedback>
            </b-col>
            <b-col>
              <b-form-timepicker
                v-model="headpain.endTime"
                locale="hr"
                :state="validateState('endTime')"
                aria-describedby="input-2-live-feedback"
              ></b-form-timepicker>
              <b-form-invalid-feedback id="input-2-live-feedback">
                This is a required field.
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
        </b-form-group>
        <b-form-group label="Jačina boli" label-for="painStrength">
          <b-row>
            <b-col>
              <b-form-select
                value-field="value"
                text-field="text"
                v-model="headpain.painStrength"
                :options="painStrengthOptions"
                :state="validateState('painStrength')"
                aria-describedby="input-2-live-feedback"
              ></b-form-select>
              <b-form-invalid-feedback id="input-2-live-feedback">
                This is a required field.
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
        </b-form-group>

        <b-form-group label="Pozicija boli" label-for="painPosition">
          <b-row>
            <b-col>
              <b-form-select
                v-model="headpain.painPosition"
                :options="painPositionOptions"
                :state="validateState('painPosition')"
                aria-describedby="input-2-live-feedback"
              ></b-form-select>
              <b-form-invalid-feedback id="input-2-live-feedback">
                This is a required field.
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
        </b-form-group>

        <b-form-group label="Mogući razlog glavobolje" label-for="painReason">
          <b-row>
            <b-col>
              <b-form-select
                v-model="headpain.painReason"
                :options="painReasonOptions"
                :state="validateState('painReason')"
                aria-describedby="input-2-live-feedback"
              ></b-form-select>
              <b-form-invalid-feedback id="input-2-live-feedback">
                This is a required field.
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
        </b-form-group>
        <b-form-group label="Simptomi" label-for="painSimptoms">
          <b-row>
            <b-col>
              <b-form-select
                v-model="headpain.painSimptoms"
                :options="painSimptomsOptions"
                :state="validateState('painSimptoms')"
                aria-describedby="input-2-live-feedback"
              ></b-form-select>
              <b-form-invalid-feedback id="input-2-live-feedback">
                This is a required field.
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
        </b-form-group>

        <b-form-group
          label="Utjecaj na dnevne aktivnosti"
          label-for="dailyActivityImpact"
        >
          <b-row>
            <b-col>
              <b-form-select
                v-model="headpain.dailyActivityImpact"
                :options="dailyActivityImpactOptions"
                :state="validateState('dailyActivityImpact')"
                aria-describedby="input-2-live-feedback"
              ></b-form-select>
              <b-form-invalid-feedback id="input-2-live-feedback">
                This is a required field.
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
        </b-form-group>

        <b-form-group
          label="Učestalost uzimanja lijekova"
          label-for="medicationFrequency"
        >
          <b-row>
            <b-col>
              <b-form-select
                v-model="headpain.medicationFrequency"
                :options="medicationFrequencyOptions"
                :state="validateState('medicationFrequency')"
                aria-describedby="input-2-live-feedback"
              ></b-form-select>
              <b-form-invalid-feedback id="input-2-live-feedback">
                This is a required field.
              </b-form-invalid-feedback>
            </b-col>
          </b-row>
        </b-form-group>
      </b-form>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="primary"
            size="sm"
            class="float-right m-l-10"
            style="margin-left: 10px"
            @click="submitForm"
          >
            Save
          </b-button>
          <b-button size="sm" class="float-right ml-2" @click="resetForm">
            Cancel
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  name: "add_new",
  mixins: [validationMixin],
  props: {
    userId: String,
  },
  data() {
    return {
      painStrengthOptions: [
        { value: null, text: "Odaberite jačinu boli" },
        { value: "1", text: "1" },
        { value: "2", text: "2" },
        { value: "3", text: "3" },
        { value: "4", text: "4" },
        { value: "5", text: "5" },
        { value: "6", text: "6" },
        { value: "7", text: "7" },
        { value: "8", text: "8" },
        { value: "9", text: "9" },
        { value: "10", text: "10" },
      ],
      painPositionOptions: [
        { value: null, text: "Odaberite poziciju boli" },
        { value: "Čelo", text: "Čelo" },
        { value: "Lijeva strana", text: "Lijeva strana" },
        { value: "Desna strana", text: "Desna strana" },
        { value: "Tjeme", text: "Tjeme" },
      ],
      painReasonOptions: [
        {
          value: null,
          text: "Odaberite moguće razloge koji su potaknuli glavobolju",
        },
        { value: "Umor", text: "Umor" },
        { value: "Promjena godišnjeg doba", text: "Promjena godišnjeg doba" },
        { value: "Depresija", text: "Depresija" },
        { value: "Previše sna", text: "Previše sna" },
        { value: "Nesanica", text: "Nesanica" },
        { value: "Previše vježbanja", text: "Previše vježbanja" },
        { value: "Stres", text: "Stres" },
        { value: "Hrana", text: "Hrana" },
        { value: "Povišena temperatura", text: "Povišena temperatura" },
        { value: "Ništa od navedenog", text: "Ništa od navedenog" },
      ],
      painSimptomsOptions: [
        { value: null, text: "Odaberite pridružene simptome" },
        { value: "Umor", text: "Umor" },
        { value: "Nesanica", text: "Nesanica" },
        { value: "Mučnina", text: "Mučnina" },
        { value: "Pospanost", text: "Pospanost" },
        { value: "Znojenje", text: "Znojenje" },
        { value: "Ništa od navedenog", text: "Ništa od navedenog" },
      ],
      dailyActivityImpactOptions: [
        { value: null, text: "Odaberite utjecaj na dnevne aktivnosti" },
        { value: "Nema", text: "Nema" },
        { value: "Blago", text: "Blago" },
        { value: "Umjereno", text: "Umjereno" },
        { value: "Jako", text: "Jako" },
      ],
      medicationFrequencyOptions: [
        { value: null, text: "Odaberite da li ste uzeli lijek" },
        { value: "Da", text: "Da" },
        { value: "Ne", text: "Ne" },
        // { value: null, text: 'Odaberite učestalost uzimanja lijekova' },
        // { value: 'Nikad', text: 'Nikad' },
        //{ value: 'Rijetko', text: 'Rijetko' },
        // { value: 'Umjereno', text: 'Umjereno' },
        // { value: 'Često', text: 'Često' },
        // { value: 'Uvijek', text: 'Uvijek' },
      ],
      headpain: {
        id: null,
        startDate: null,
        startTime: null,
        endDate: null,
        painStrength: null,
        painPosition: null,
        painReason: null,
        painSimptoms: null,
        dailyActivityImpact: null,
        medicationFrequency: null,
      },
      submitted: false,
    };
  },
  validations: {
    headpain: {
      startDate: { required },
      endDate: { required },
      startTime: { required },
      endTime: { required },
      painStrength: { required },
      painPosition: { required },
      painReason: { required },
      painSimptoms: { required },
      dailyActivityImpact: { required },
      medicationFrequency: { required },
    },
  },
  mounted() {
    this.$root.$on("onEdit", (data) => {
      this.headpain = data;
      this.headpain.isEdit = true;
      this.submitted = false;
    });
    this.$root.$on("onAdd", (data) => {
      console.log(data);
      this.headpain = {};
      this.headpain.isEdit = false;
      this.submitted = false;
    });
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
    bindItemsList() {
      return this.items;
    },
  },
  watch: {
    bindItemsList: {
      deep: true,
      handler: function (list) {
        this.totalRows = list.length;
      },
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.headpain[name];
      return $dirty ? !$error : null;
    },
    async submitForm() {
      this.submitted = true;
      this.$v.headpain.$touch();
      if (this.$v.headpain.$anyError) {
        return;
      }
      this.$bvModal.hide("addNew");
      if (!this.headpain.isEdit) {
        await this.addNewHeadPain({ headpain: this.headpain });
      } else {
        await this.updateHeadPain({ headpain: this.headpain });
      }
    },
    resetForm() {
      this.headpain = {};
      this.headpain.isEdit = false;
      this.submitted = false;
    },
    async addNewHeadPain(data) {
      try {
        delete data.headpain.isEdit;
        data.headpain.userId = this.userId;
        let response = await this.$http.post(`/pain-diary`, {
          headpain: data.headpain,
        });

        if (response.status === 200) {
          this.makeToast("success", "Item created successfully!");
          this.$root.$emit("newData");
        } else {
          this.makeToast("danger", "Something went wrong!");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async updateHeadPain(data) {
      try {
        delete data.headpain.isEdit;
        data.headpain.userId = this.userId;
        let response = await this.$http.patch(`/pain-diary`, {
          headpain: data.headpain,
        });

        if (response.status === 200) {
          this.makeToast("success", "Item updates successfully!");
          this.$root.$emit("newData");
        } else {
          this.makeToast("danger", "Something went wrong!");
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

<style></style>
