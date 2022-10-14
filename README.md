# Api do vulcana uonet+

## Wymagania
  - W .env należy uzupełnić wartości według tych, które dostaje się przy dodaniu nowego urządzenia do dziennika

## Funkcje

### Endpointy API
  - GET `/lessons/week/` zwraca dane o lekcjach z tego lub następnego tygodnia zależnie od dnia tygodnia
  - GET `/lessons/day/:offset` zwraca dane o lekcjach z dnia, gdzie `:offset` jest liczbą dni od bieżącego dnia (`:offset` może być ujemny)
  - GET `/lessons/day` zwraca dane o informacjach z bieżącego dnia

## Uruchomienie
  1. Ustaw wartości `.env` (patrz `.env.example`)
  2. W terminalu wykonaj `npm i`
  3. W terminalu wykonaj `npm run start`
  4. Opcjonalnie ustaw `key.pem` i `cert.pem` w `cert/` żeby włączyć https