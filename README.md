# Pokedex Manager

Aplikacja internetowa stworzona w technologii React przy użyciu Vite jako bundlera i środowiska developerskiego, umożliwiająca zarządzanie kolekcją Pokémonów z wykorzystaniem lokalnej bazy danych JSON Server. Projekt zawiera funkcjonalności związane z przeglądaniem, edycją, tworzeniem, walkami Pokémonów oraz systemem rankingowym.

## Uruchamianie aplikacji

### Wymagania wstępne

- Node.js (zalecana wersja: LTS)
- NPM lub Yarn
- Zainstalowany `json-server`

### Instalacja

1. Zainstaluj zależności:

```bash
npm install
```

2. Uruchom serwer danych (JSON Server) z katalogu, w którym się znajduje plik `db.json`:

```bash
json-server --watch db.json
```

3. Uruchom aplikację developerską z katalogu projektu:

```bash
npm run dev
```

## Funkcjonalności

### Autoryzacja

- Obsługa lokalnych użytkowników (przechowywanych w pliku `db.json`)
- Możliwość przełączania trybu Dark Mode

### Strona główna

- Lista 150 Pokémonów z API + te lokalnie stworzone
- Wyświetlanie statystyk wygranych i przegranych (W/L)
- Możliwość wyszukiwania i paginacji
- Moliwość przejścia do podstrony z szczegółowymi informacjami na temat danego Pokemona

#### Szczegóły Pokémona

- Widok szczegółów z możliwością dodania do ulubionych i na Arenę
- Synchronizacja danych z lokalnym serwerem
- Możliwość dodania do ulubionych
- Możliwość dodania do wojennych patycypantów (Arena)

### Ulubione

- Lista ulubionych Pokémonów również z możliwością paginacji przy ponad 15 ulubionych pokemonach

### Arena

- Porównanie dwóch Pokémonów na podstawie ich wagi i doświadczenia
- Zwycięzca otrzymuje dodatkowe doświadczenie i statystykę wygranej
- Przegrany otrzymuje statystykę porażki
- Możliwość usuwania pojedynczych pokemonów guzikiem z karty lub obu naraz guzikiem po skończonej bitwie

### Ranking

- Lista wszystkich Pokémonów posortowana według wybranego kryterium
- Obsługa sortowania po: doświadczeniu, wadze, wzroście, liczbie wygranych i przegranych za pomocą dropdown menu

### Edycja

- Możliwość edycji atrybutów istniejących Pokémonów po kliknięciu w dany atrybut oprócz Zdolności
- Modal z formularzem walidowany za pomocą `React Hook Form` oraz `Zod`
- Obsługa tworzenia nowych Pokémonów z wyborem nieużywanej grafiki pokemonów z indeksem 151+
- Powrót na stronę główną po zapisaniu zmian
- Powrót na stronę edycji po kliknięciu poza modal

## Konwencje

- Zarządzanie stanem aplikacji za pomocą `Context API` oraz `useState` i `useEffect`
- Routing za pomocą `react-router-dom`
- Projekt oparty na modularnej strukturze komponentów
- Walidacja danych użytkownika i formularzy z użyciem `React Hook Form` i `Zod`
- Powiadomienia przekazywane za pomocoą `Notistack`
- Komunikacja z API za pomocą `Axios`
- Przechowywanie danych lokalnie za pomocą `JSON-server` i `LocalStorage`
- Stylizacja z wykorzystaniem `Tailwind CSS`
