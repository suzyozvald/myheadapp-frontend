# MyHeadApp

## Opis aplikacije

Ideja je napraviti aplikaciju za praćenje glavobolja kod osoba koje imaju problema sa učestalim glavoboljama kako bi imale na jednom mjestu evidenciju i statistiku glavobolja radi lakšeg komuniciranja sa svojim liječnikom u svrhu riješavanja problema. Korisnik aplikacije bi temeljem definiranih parametara u aplikaciji odgovarao na ponuđena pitanja čime bi se za svaku glavobolju kreirao jedan zapis/unos u bazu podataka. Temeljem zapisa za svaku glavobolju korisnik bi mogao dobiti statistiku svojih glavobolja u svrhu praćenja i liječenja svojih glavobolja.

### Uputa za rad sa aplikacijom

Za korištenje aplikacije potrebna je registracija korisnika te prijava. Nakon prijave korisnik unosi podatke o svakoj glavobolji odgovarajući na predefinirana pitanja odabirom ponuđenih odgovora iz padajućeg izbornika nakon čega se za svaku glavobolju sprema zapis u tablicu glavobolja.

#### Postavljanje projekta

node -v   --> provjera verzije Node.js
npm i -g @vue/cli   --> globalno da bude dostupno na cijelom računalu
vue -V   --> provjera instalirane verzije Vue.js
vue create MyHeadApp
npm init --> inicijalizacija novog node projekta
npm install express --save  --> instalacija express paketa
npm install @babel/core @babel/node @babel/preset-env --save-dev
npm install nodemon --save-dev

##### Instalacija ostalih npm paketa

npm install cors --save
npm install axios --save
npm install mongodb --save
npm install jsonwebtoken --save
npm install bcrypt --save
npm install dotenv --save
