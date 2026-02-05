# WebdriverIO Test Automation Framework - Refactored with POM

## 📋 Pregled projekta

Ovo je refaktorisana verzija WebdriverIO test automation projekta koja koristi **Page Object Model (POM)** arhitekturu i najbolje prakse za strukturiranje test automation framework-a.

## 🏗️ Struktura projekta

```
wdio-refactored/
├── pages/                  # Page Object Model klase
│   ├── BasePage.js        # Bazna klasa sa zajedničkim metodama
│   ├── LoginPage.js       # Page object za login stranicu
│   ├── RegistrationPage.js # Page object za registraciju
│   ├── HomePage.js        # Page object za home stranicu
│   ├── ProductDetailsPage.js # Page object za detalje proizvoda
│   ├── CartPage.js        # Page object za korpu
│   ├── ProfilePage.js     # Page object za profil
│   └── FavoritesPage.js   # Page object za omiljene proizvode
├── test/                   # Test fajlovi
│   ├── auth.test.js       # Testovi za autentifikaciju
│   ├── browse.test.js     # Testovi za pretraživanje
│   ├── cart.test.js       # Testovi za korpu
│   ├── productDetails.test.js # Testovi za detalje proizvoda
│   └── profile.test.js    # Testovi za profil i favorite
├── data/                   # Test data
│   ├── users.js           # Podaci o korisnicima
│   ├── urls.js            # URL-ovi aplikacije
│   └── products.js        # Podaci o proizvodima
├── helpers/                # Helper funkcije
│   └── testHelpers.js     # Utility funkcije za testove
├── wdio.conf.js           # WebdriverIO konfiguracija
└── package.json           # NPM dependencies i skripte

```

## 🎯 Ključne karakteristike

### 1. **Page Object Model (POM)**
- Svaka stranica aplikacije ima svoju klasu
- Enkapsulacija selektora i akcija
- Lakše održavanje i čitljivost testova
- Ponovna upotrebljivost koda

### 2. **Base Page klasa**
- Zajedničke metode za sve stranice:
  - `waitForElement()` - Čekanje na element
  - `clickElement()` - Klik na element sa wait-om
  - `setInputValue()` - Postavljanje vrednosti u input polje
  - `waitForUrlContains()` - Čekanje na URL promenu
  - `getElementText()` - Dobijanje teksta elementa
  - I mnoge druge...

### 3. **Test Data Separation**
- Podaci odvojeni od testova
- Lakše upravljanje test data-om
- Jednostavna izmena podataka bez menjanja testova

### 4. **Helper funkcije**
- `generateRandomEmail()` - Generisanje random email-a
- `generateUserData()` - Generisanje korisničkih podataka
- `loginAsValidUser()` - Login helper za brže testiranje
- `waitForNavigation()` - Čekanje na navigaciju

## 🚀 Instalacija

1. Instalacija dependencies:
```bash
cd wdio-refactored
npm install
```

## ▶️ Pokretanje testova

### Pokretanje svih testova:
```bash
npm test
```

### Pokretanje specifičnih test suite-ova:
```bash
# Auth testovi
npm run test:auth

# Browse testovi  
npm run test:browse

# Cart testovi
npm run test:cart

# Product details testovi
npm run test:product

# Profile testovi
npm run test:profile
```

## 📝 Primer korišćenja Page Objects

### Stari način (bez POM):
```javascript
it("should login", async () => {
  await browser.url("/auth/login");
  await $("[data-test='email']").setValue("test@mail.com");
  await $("[data-test='password']").setValue("password");
  await $("[data-test='login-submit']").click();
});
```

### Novi način (sa POM):
```javascript
it("should login", async () => {
  await LoginPage.open();
  await LoginPage.login("test@mail.com", "password");
});
```

## 🔧 Tehnologije

- **WebdriverIO** v9.23.2 - Test automation framework
- **Mocha** - Test framework
- **Chai** - Assertion library
- **Chrome** - Browser za izvršavanje testova

## 📊 Test Coverage

Projekat pokriva sledeće funkcionalnosti:
- ✅ Registracija novog korisnika
- ✅ Login funkcionalnost
- ✅ Pretraživanje proizvoda
- ✅ Filtriranje po kategorijama
- ✅ Dodavanje u korpu
- ✅ Pregled detalja proizvoda
- ✅ Ažuriranje profila
- ✅ Dodavanje u omiljene

## 🎨 Prednosti ovog pristupa

1. **Održivost** - Promene u UI zahtevaju izmene samo u Page Object klasama
2. **Čitljivost** - Testovi su jasniji i razumljiviji
3. **Ponovna upotreba** - Metode se mogu koristiti u više testova
4. **Skalabilnost** - Lako se dodaju novi testovi i page objekti
5. **Separation of Concerns** - Podaci, logika stranica i testovi su odvojeni

## 📚 Dodatne informacije

Za više informacija o WebdriverIO-u: https://webdriver.io/

## 🔄 Poređenje sa starim projektom

Stari projekat (`wdio-chai`) je zadržan u originalnom stanju za referencu. Novi refaktorisani projekat (`wdio-refactored`) koristi najbolje prakse i organizovan je prema Page Object Model šablonu.
