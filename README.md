# Анкета за множествена склероза — GitHub Pages

Този проект съдържа:
- `index.html` — публичната анкета;
- `logo.png` — предоставеното лого;
- `Code.gs` — Google Apps Script, който записва отговорите в Google Sheets.

## 1. Създай Google Sheet

Създай нов Google Sheet. Не го споделяй публично — остави достъп само за себе си.

Копирай ID-то от адреса на таблицата:
`https://docs.google.com/spreadsheets/d/ТУК_Е_ID/....`

По желание създай лист с име `Отговори`; скриптът може и сам да го създаде.

## 2. Настрой Google Apps Script

В Google Drive → New → More → Google Apps Script.

Постави съдържанието на `Code.gs`.

В кода замени:
`PASTE_GOOGLE_SHEET_ID_HERE`
с ID-то на твоя Google Sheet.

После:
Deploy → New deployment → Web app

Настройки:
- Execute as: Me
- Who has access: Anyone

Копирай URL адреса на Web App.

## 3. Свържи GitHub Pages с Google Apps Script

Отвори `index.html` и замени:

`PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE`

с Web App URL адреса.

## 4. Качи проекта в GitHub

Създай repository и качи:
- `index.html`
- `logo.png`

`Code.gs` не е необходимо да е публичен в GitHub. Препоръчително е да го пазиш само в Google Apps Script.

След това:
Settings → Pages → Deploy from branch → `main` → `/root`

GitHub ще даде публичен адрес на анкетата.

## 5. Резултатите

Отговорите се записват в твоя Google Sheet. Понеже таблицата не е публична, само хората, на които дадеш достъп до нея, могат да виждат резултатите.

От Google Sheets можеш да изтеглиш данните като:
File → Download → Microsoft Excel (.xlsx)
или
File → Download → Comma-separated values (.csv)

## Важно за поверителността

Анкетата събира информация, свързана със здравен статус (например МС и EDSS). Преди публично разпространение прецени как ще информираш участниците за целта на изследването, съхранението на данните, кой има достъп до тях и срока за съхранение. Не добавяй имена, ЕГН, телефон или други преки идентификатори, освен ако това е необходимо и надлежно уредено.
