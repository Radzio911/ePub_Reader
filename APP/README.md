- Formularze logowania powinny być szersze

- Jezeli ksiązka nie ma okładki przy zapytaniu o nią to powinien zostać zwrócony obraz
  `https://i.pinimg.com/236x/b8/bd/3f/b8bd3f935d3c7270a454da6903096706.jpg`

- W formularzu dodawania ksiązki kategorie powinny byc pobierane z api, tam to moze byc zwykla lista

- Input nazwy powinien miec podpowiedzi z api: `/search-book-titles`
  [https://mui.com/material-ui/react-autocomplete/#combo-box]

- Po zalogowaniu powinno nas przenieść na stronę główną a jezeli sie nie uda to wyświetliś odpowiedni komunikat.

- Przy poprawnej rejestracji powinno nas od razu zalogowac - nie w api tylko w app (drugi request)

- W menu gdy jesteśmy zaloagowani powinno być widać naszą nazwę uzytkownika:
  `📘BOOK` <-- --> `<username> | Logout`

- Kolor strony (ten co jest teraz niebieski) powinien być wybierany losowo przy kazdym odświezeniu strony z listy: `["#ff4a47ff", "#922ddaff", "#3e50bfff", "#00897b", "#fdd835"]` - link do dokumentacji: [https://mui.com/material-ui/customization/theming/?utm_source=chatgpt.com#css-theme-variables]
