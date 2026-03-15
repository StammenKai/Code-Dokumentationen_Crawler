# Graph API

> Source: https://developers.facebook.com/docs/graph-api/

![](https://facebook.com/security/hsts-pixel.gif)

[

Meta-Logo

](/?no_redirect=true)

DokumentationDokumentationDokumentation

ToolsToolsTools

SupportSupportSupport

MehrMehrMehr

Sucheingabe

​

[

AnmeldenAnmeldenAnmelden



](https://business.facebook.com/business/loginpage/?is_work_accounts=true&login_options[0]=FB&login_options[1]=SSO&config_ref=biz_login_tool_flavor_dfc&app=436761779744620&next=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fgraph-api%2F%3Fnav_ref%3Dbiz_unified_f3_login_page_to_dfc)

[Graph API](/docs/graph-api)

-   [Übersicht](/docs/graph-api/overview)
-   [Status, Support, and Tools](/docs/graph-api/support-and-tools)
-   [Erste Schritte](/docs/graph-api/get-started)
-   [Batch-Anfragen](/docs/graph-api/batch-requests)
-   [Debuggen von Anfragen](/docs/graph-api/guides/debugging)
-   [Behandlung von Fehlern](/docs/graph-api/guides/error-handling)
-   [Field Expansion](/docs/graph-api/guides/field-expansion)
-   [Secure Requests](/docs/graph-api/guides/secure-requests)
-   [Datei oder Video hochladen](/docs/graph-api/guides/upload)
-   [Änderungsprotokoll](/docs/graph-api/changelog)
-   [Features-Referenz](/docs/features-reference)
-   [Permissions Reference](/docs/permissions)
-   [Reference](/docs/graph-api/reference)

Auf dieser Seite

[Graph API](#graph-api)

[Erste Schritte](#erste-schritte)

Wenn du als Facebook-Nutzer\*in Probleme mit der Anmeldung bei deinem Konto hast, besuche unseren [Hilfebereich](https://www.facebook.com/help/1573156092981768/).

# Graph API

<table class="uiGrid _51mz _57v1" cellspacing="0" cellpadding="0"><tbody><tr class="_51mx"><td class="_51m- vTop _57v2"><p><strong>Die neueste Version lautet</strong>:</p></td><td class="_51m- vTop _57v2 _51mw"><code>v25.0</code></td></tr></tbody></table>

Die Graph API ist die gängigste Methode, mit der Apps Daten in den Facebook Social Graph schreiben und davon auslesen. Alle unsere SDKs und Produkte interagieren auf bestimmte Weise mit der Graph API. Unsere anderen APIs stellen Erweiterungen der Graph API dar. Daher solltest du mit der Funktionsweise der Graph API unbedingt vertraut sein.

Wenn du bisher nicht mit der Graph API vertraut bist, empfehlen wir dir für den Einstieg die folgenden Dokumente:

1.  [Übersicht](/docs/graph-api/overview) – Erfahre, wie die Graph API strukturiert ist und wie sie funktioniert.
2.  [Erste Schritte](/docs/graph-api/get-started) – Lerne die Endpunkte der Graph API mithilfe des Graph API Explorer-Tools kennen und führe deine erste Anfrage aus.
3.  [Batch-Anfragen](/docs/graph-api/batch-requests) – Lerne, wie du mehrere API-Anfragen in einem einzigen Aufruf sendest.
4.  [Debuggen von Anfragen](/docs/graph-api/guides/debugging) – Lerne, wie du API-Anfragen debuggen kannst.
5.  [Behandlung von Fehlern](/docs/graph-api/guides/error-handling) – Erfahre, wie du häufige Fehler bei der Verwendung der Graph API behebst.
6.  [Felderweiterung](/docs/graph-api/guides/field-expansion) – Erfahre, wie du die Anzahl der Objekte eingrenzt, die in einer Anfrage zurückgegeben werden, und wie du verschachtelte Anfragen ausführst.
7.  [Sichere Anfragen](/docs/graph-api/guides/secure-requests) – Lerne, wie du sichere Anfragen an die Graph API durchführst.
8.  [Resumable Uploads API](/docs/graph-api/guides/upload) – Erfahre, wie du Dateien in die Graph API hochlädst.

#### [Referenz](/docs/graph-api/reference)

Erfahre, wie du dich in unseren Referenzdokumenten zurechtfindest und so schnell die gewünschten Inhalte findest.

## Erste Schritte

Wir empfehlen dir dringend, mit der [**Graph API-Übersicht**](/docs/graph-api/overview) zu beginnen, um die Struktur des Facebook Social Graphs kennenzulernen.

[](#)

[](#)

Auf dieser Seite

[Graph API](#graph-api)

[Erste Schritte](#erste-schritte)

                                       

 

[](#)

Die Verwendung von Cookies durch Facebook in diesem Browser erlauben?

Wir verwenden Cookies und ähnliche Technologien, um Inhalte in [Meta-Produkten](https://www.facebook.com/help/1561485474074139) bereitzustellen und zu verbessern. Darüber hinaus verwenden wir sie, um mithilfe der durch Cookies auf und außerhalb von Facebook empfangenen Informationen die Sicherheit zu verbessern sowie um Meta-Produkte für Personen, die ein Konto haben, bereitzustellen und zu verbessern.

-   Erforderliche Cookies: Diese Cookies sind notwendig für die Nutzung von Meta-Produkten und die ordnungsgemäße Funktion unserer Websites.
-   Cookies anderer Unternehmen: Wir verwenden diese Cookies, um dir Werbeanzeigen außerhalb von Meta-Produkten zu zeigen und Funktionen wie Karten oder Videos in Meta-Produkten anbieten zu können. Hierbei handelt es sich um optionale Cookies.

Du bestimmst, welche optionalen Cookies wir verwenden dürfen. In unserer [Cookie-Richtlinie](https://www.facebook.com/privacy/policies/cookies) erfährst du mehr über Cookies und wie wir sie verwenden. Dort kannst du deine Auswahl außerdem jederzeit überprüfen oder ändern.

* * *

## Infos zu Cookies

![background image](https://www.facebook.com/images/cookies/cookie_info_card_image_1.png)

Was sind Cookies?

Mehr dazu

![background image](https://www.facebook.com/images/cookies/cookie_info_card_image_2.png)

Warum verwenden wir Cookies?

Mehr dazu

![background image](https://www.facebook.com/images/cookies/cookie_info_card_image_3.png)

Was sind Meta-Produkte?

Mehr dazu

![background image](https://www.facebook.com/images/cookies/cookie_info_card_image_4.png)

Deine Cookie-Auswahl

Mehr dazu

* * *

## Cookies anderer Unternehmen

Wir verwenden Cookies [anderer Unternehmen](https://www.facebook.com/privacy/policies/cookies/?annotations[0]=explanation%2F3_companies_list), um dir Werbeanzeigen außerhalb von unseren Produkten zu zeigen und Funktionen wie Karten, Zahlungsdienste oder Videos anbieten zu können.

So verwenden wir diese Cookies

Wir verwenden Cookies anderer Unternehmen in unseren Produkten für Folgendes:

-   Um dir Werbeanzeigen für unsere Produkte und Features in den Apps und auf den Websites anderer Unternehmen zu zeigen
-   Um in unseren Produkten Funktionen wie Karten, Zahlungsdienste und Videos anbieten zu können.
-   Zu Analysezwecken

Wenn du diese Cookies erlaubst:

-   Hat das keine Auswirkungen auf Funktionen, die du in Meta-Produkten nutzt
-   Können wir Werbeanzeigen außerhalb von Meta-Produkten besser für dich personalisieren und deren Performance messen
-   Erhalten andere Unternehmen mithilfe ihrer Cookies Informationen über dich

Wenn du diese Cookies nicht erlaubst:

-   Funktionieren manche Features unserer Produkte möglicherweise nicht
-   Verwenden wir keine Cookies anderer Unternehmen, um Werbeanzeigen außerhalb von Meta-Produkten für dich zu personalisieren oder um deren Performance zu messen

## Andere Möglichkeiten, um deine Informationen zu kontrollieren

Personalisiere dein Werbeerlebnis in der Kontenübersicht

Du kannst dein Werbeerlebnis über folgende Einstellungen personalisieren.

Werbepräferenzen

In deinen Werbepräferenzen kannst du festlegen, ob wir dir Werbung zeigen sollen, und auswählen, welche Informationen wir dafür verwenden dürfen.

Einstellungen für Werbung

Wenn wir dir Werbung zeigen, verwenden wir Informationen, die Werbetreibende und andere Partner uns zu deinen Aktivitäten außerhalb von Produkten der Meta-Unternehmen, zum Beispiel auf deren Websites und Apps, bereitstellen, um dir bessere Werbung zeigen zu können. In deinen [Einstellungen für Werbung](https://www.facebook.com/settings/ads/) kannst du festlegen, ob wir diese Informationen verwenden dürfen, um dir Werbung zu zeigen.

Weitere Informationen zu Onlinewerbung

Wenn du keine interessenbasierten Online-Werbeanzeigen von Meta und anderen teilnehmenden Unternehmen mehr sehen möchtest, kannst du dich über die [Digital Advertising Alliance](https://l.facebook.com/l.php?u=https%3A%2F%2Foptout.aboutads.info%2F&h=AT54OAGNIlG6rir45jEGUKvO8W9pT4H3h8zqd8fuQs_YDyryIp7Rhy_v2lqIofUG18fzZWpj_ex-yS_B-IaKGKgOr0v3AqOPZxyW_D1PY-CvTd_c1ovOHHnJk6ELj3Y9KmnXJb7jSNh-uofQ9-jc-R-MaYQBT64PzpYENw) (USA), die [Digital Advertising Alliance of Canada](https://l.facebook.com/l.php?u=https%3A%2F%2Fyouradchoices.ca%2F&h=AT7K5TDt1xVURPriNUvxd_hlnpp2cgLM8pyyqB9y7y3ASV-2Pzzls0Wl1HPO1bv0Eosnx9z7qqTtoMYHLpq6_RfJsosneBWiBDgHjKPqSO2E-nOox7fbxmkMdUr10S5tE2A9HLj_Tyc0LnyYYro5_xe2DZ_fRKEGw8gfNg) (Kanada), die [European Interactive Digital Advertising Alliance](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youronlinechoices.com%2F&h=AT6Vlm3FXqXZCnE0H4IZH00O-T4e8lhF5MLWHXoh0fvvhQZ4MFEO1TswVvgaYqWtPi4WTpHObXU4xaFC0W__nJmsU9UousiNxfHFHFN8gtq9p58bzVPChka1EOEXblbvtHUOulK-ZPOx1IuPV9bp3JpD4Kw5LSkEbe5A_3Wc_Wsrip9XV0U) (Europa) oder über die Einstellungen deines Smartphones (wenn du Android, iOS 13 oder eine frühere Version von iOS verwendest) davon abmelden. Bitte beachte, dass Werbeblocker und Tools, die die Verwendung von Cookies durch uns einschränken, diese Einstellungen beeinträchtigen könnten.

Cookies über die Browser-Einstellungen kontrollieren

In den Einstellungen deines Browsers oder Geräts kannst du möglicherweise auswählen, ob Browser-Cookies akzeptiert oder gelöscht werden sollen. Diese Einstellungen unterscheiden sich je nach Browser. Hersteller können sowohl die verfügbaren Einstellungen als auch deren Funktionsweise jederzeit ändern. Ab dem 5. Oktober 2020 findest du über die nachstehenden Links zusätzliche Informationen zu Einstellungsoptionen der beliebtesten Browser. Wenn du Browser-Cookies deaktivierst, funktionieren bestimmte Teilbereiche von Meta-Produkten möglicherweise nicht einwandfrei. Bitte beachte, dass sich diese Einstellungen von den Facebook-Einstellungen unterscheiden.

-   [Google Chrome](https://l.facebook.com/l.php?u=https%3A%2F%2Fsupport.google.com%2Fchrome%2Fanswer%2F95647&h=AT4UWBpN1paFDw4xKSL1FlbyEEsK9Evrx5SgD8olm7xlYGpWAQ6TaEefiF2PwgR1DJ9YHO6RLTcpHn-ZwLb-Mi227wXC4yCoYOMgAdahEVJlFN8nTx1GPa8qWOz4xqcvROESeaELo9K023BAGZWoi3gUivVeWbMI_yj4dA)
-   [Internet Explorer](https://l.facebook.com/l.php?u=https%3A%2F%2Fsupport.microsoft.com%2Fen-ie%2Fhelp%2F17442%2Fwindows-internet-explorer-delete-manage-cookies&h=AT6cmOSpAoZ6b3Ty2rZTA3-9ilQgzXdOtZBh6eoJ1Rb4jTRdMrbsqZMHJZbkvymrsgQkqntr3DAMLgRq_dGy9d92P3GzBtGlqtRFpc_yeSiz2Dio4LwF4axnBt-Xr2oj1ilxB8FH9jWEK8-pM6IS7q0rABfBDzngAy77Vw)
-   [Firefox](https://l.facebook.com/l.php?u=https%3A%2F%2Fsupport.mozilla.org%2Fen-US%2Fkb%2Fenable-and-disable-cookies-website-preferences&h=AT78YzMzXvTJcS5R21JFrxd4psaJiP9qJEsk28LCgDzOGMJ-Cus6wWrhwbzlN73cn1iMCjCbY15OxA7adX4LLfVR91QHHFxRN6eXHTKET1yNC8vYG_yy3so3-PvmDEgj21LVXpdU3mLQ7U-aQb2iLFPgqs5K7TPXCLdgkg)
-   [Safari](https://l.facebook.com/l.php?u=https%3A%2F%2Fsupport.apple.com%2Fen-ie%2Fguide%2Fsafari%2Fsfri11471%2Fmac&h=AT6LW571kjwO9xhGw05AELhKaoVXgfhhHKP9iEm7yUTZJmQ-lEj9j6GrUOSVyGZ2iHZ_7RmmFYb7VJHPx_fArx2WfxNFn2s3s0XkaJMvqHD1Fbugfnwg7e9q_QYv5w8seopuNoSD-gKf8hd6ZyqPLuZ7UOH8buAGozDwVw)
-   [Safari (Mobilgeräte)](https://l.facebook.com/l.php?u=https%3A%2F%2Fsupport.apple.com%2Fen-us%2FHT201265&h=AT4_gJ0xgAQgDmxaEPaV-gsC9jTdSMwllCAueO07HFHTnPlo5chAjB-dkckOkZQpusWTL4sHmqzwDjY5e3lsJV3_iBGG2OmMD6cq1hysfJRP7FMlfhppJJFVY3qAKpYQ13JcUUy90bzRFFzBPIFvTOs2FiRN5qU3T1YExA)
-   [Opera](https://l.facebook.com/l.php?u=https%3A%2F%2Fblogs.opera.com%2Fnews%2F2015%2F08%2Fhow-to-manage-cookies-in-opera%2F&h=AT61yt4DVpfBZCgvHX2ujuOSOevz-0i1vboHnoSNvtqqLuzCY3mxNwUisCORfAhgn-5kUCiaeVqMPOQXqWwEwRGAiQx9_dRf8CYHMap9rRRSjK2Dmy7YUQXZE0DCfKxw71UF9DnHfho-PvZuQ5fNka9I4NZeu9qT4xQRzQ)

Optionale Cookies ablehnenAlle Cookies erlauben

![background image](https://www.facebook.com/images/cookies/cookie_info_popup_image_1.png)

## Was sind Cookies?

Cookies sind kleine Textdateien, die zum Speichern und Empfangen von Kennungen in einem Webbrowser verwendet werden. Wir verwenden Cookies und ähnliche Technologien, um Meta-Produkte anzubieten und um Informationen, die wir über Nutzer erhalten, etwa zu ihren Aktivitäten auf anderen Websites und in anderen Apps, nachvollziehen zu können.

Solltest du kein Konto haben, verwenden wir keine Cookies, um Werbeanzeigen für dich zu personalisieren. Informationen zu deinen Aktivitäten, die wir erhalten, verwenden wir lediglich für die Sicherheit und Integrität unserer Produkte.

In unserer [Cookie-Richtlinie](https://www.facebook.com/privacy/policies/cookies) erfährst du mehr über Cookies und wie wir sie verwenden.

![background image](https://www.facebook.com/images/cookies/cookie_info_popup_image_2.png)

## Warum verwenden wir Cookies?

Mithilfe von Cookies können wir die Meta-Produkte anbieten, schützen und optimieren, beispielsweise indem wir Inhalte personalisieren, Werbeanzeigen individuell zuschneiden und ihre Performance messen, sowie ein sichereres Nutzungserlebnis ermöglichen.

Welche Cookies wir verwenden, kann sich aufgrund von Optimierungen und Aktualisierungen der Meta-Produkte von Zeit zu Zeit ändern. Unabhängig davon verwenden wir Cookies zu folgenden Zwecken:

-   Zur Authentifizierung, damit Nutzer angemeldet bleiben können
-   Um Sicherheit sowie Website- und Produktintegrität gewährleisten zu können
-   Um Werbung, Empfehlungen, Insights und Messungen zur Verfügung stellen zu können, sofern wir dir Werbung zeigen
-   Um Websitefunktionen und -dienste anbieten zu können
-   Um die Performance unserer Produkte nachvollziehen zu können
-   Um Analysen und Forschung zu ermöglichen
-   Auf Websites und in Apps Dritter, um Unternehmen, die Meta-Technologien nutzen, zu ermöglichen, Informationen zu Aktivitäten in ihren Apps und auf ihren Websites mit uns zu teilen.

In unserer [Cookie-Richtlinie](https://www.facebook.com/privacy/policies/cookies) erfährst du mehr über Cookies und wie wir sie verwenden.

![background image](https://www.facebook.com/images/cookies/cookie_info_popup_image_3.png)

## Was sind Meta-Produkte?

Zu den Meta-Produkten zählen die Facebook-, Instagram- und Messenger-App sowie weitere in unserer Datenschutzrichtlinie aufgeführten Funktionen, Apps, Technologien, Software oder Dienste, die Meta anbietet.

Weitere Infos zu [Meta-Produkten findest du in unserer Datenschutzrichtlinie](https://www.facebook.com/privacy/policy/?annotations[0]=0.ex.0-WhatProductsDoesThis&entry_point=cookie_consent_modal_what_are_meta_products).

![background image](https://www.facebook.com/images/cookies/cookie_info_popup_image_4.png)

## Deine Cookie-Auswahl

Du kannst bestimmen, inwiefern wir optionale Cookies verwenden dürfen:

-   Mithilfe unserer Cookies in Apps und auf Websites anderer Unternehmen, die Meta-Technologien wie den „Gefällt mir“-Button oder das Meta-Pixel nutzen, können wir Werbung für dich personalisieren, sofern wir dir Werbung zeigen.
-   Wir verwenden Cookies anderer Unternehmen, um dir Werbeanzeigen außerhalb von Meta-Produkten zu zeigen und Funktionen wie Karten oder Videos in Meta-Produkten anbieten zu können.

Du kannst diese Auswahl jederzeit in deinen Cookie-Einstellungen einsehen oder ändern.
