<p align="center">
    <a href="https://www.kbv.de/" target="_blank" rel="noopener noreferrer"><img width="250" src="https://www.kbv.de/system/layout/logo_kbv.png" alt="Vue logo"></a>
</p>

<p align="center">

[![Build](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)]()
[![Coverage](https://img.shields.io/badge/coverage-85.7%25-green?style=flat-square)]()
[![License](https://img.shields.io/badge/License-LGPLv3-blue.svg?style=flat-square)](https://opensource.org/licenses/Apache-2.0&style=flat-square)
[![Lint: eslint](https://img.shields.io/github/workflow/status/prettier/prettier/Lint?label=Lint&style=flat-square)]()
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

</p>

# MIO Viewer
Der MIO Viewer ist ein JavaScript/TypeScript Package, dass es möglich macht Medizinische Informationsobjekte (kurz MIO) in einem einfachen Interface darzustellen. 
MIOs dienen dazu, medizinische Daten - etwa in einer elektronischen Patientenakte - standardisiert, also nach einem festgelegten Format, zu dokumentieren. 
Sie können als kleine digitale Informationsbausteine verstanden werden, die universell verwendbar und kombinierbar sind. 
Beispiele für bereits entwickelte MIOs sind der Impfpass und das zahnärztliche Bonusheft. Mehr dazu auf https://mio.kbv.de. 

Über diese Anwendung können entschlüsselte JSON- und XML MIOs eingelesen werden. Diese werden dann dargestellt und lassen sich auch als PDF exportieren. 

## Hintergrund 

Ab dem Jahr 2022 werden in der elektronische Patientenakte MIOs für alle Versicherten in Deutschland eingeführt. 
Die KBV hat den gesetzlichen Auftrag, die semantische und syntaktische Interoperabilität für Inhalte der elektronischen Patientenakte festzulegen. 
Zu diesem Zweck entwickelt die KBV die medizinischen Informationsobjekte, mit dem Ziel einen einheitlichen Standard zur Übertragung und Verarbeitung von medizinischen Daten zu definieren. 
Die MIOs werden in HL7® FHIR® profiliert. 

Der MIO Viewer ist ein Tool, was es Endanwendern einfach machen soll sich diese Informationen anzeigen zu lassen. 
Hierfür wird es zur freien Nutzung unter der LGPLv3 Lizenz zur Verfügung gestellt. 

## Allgemeines 

Folgende MIOs können vom Viewer angezeigt werden:

-   Impfpass
-   Zahnärztliches Bonusheft
-   Mutterpass

## Setup

Die folgenden Anweisungenen sollen helfen die Software herunterzuladen, installieren und auszuführen.

### Voraussetzungen 

[![Node Version](http://img.shields.io/badge/node-<=12.19.0-brightgreen.svg?style=flat-square)](https://nodejs.org/)
[![NPM Version](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/)

<a href="http://nodejs.org" target="_blank">Node.js</a> mit NPM muss installiert sein. 

### Setup 

Code von GitHub runterladen oder klonen. 

```shell script
$ git clone https://github.com/kassenaerztliche-bundesvereinigung/mioviewer.git
$ cd mioviewer
$ npm install
$ npm run start
```

Nach erfolgreichem Start der Anwendung kann der Browser auf http://localhost:3000/ geöffnet werden. 

Beispiel Dateien können im Repository `https://github.com/kassenaerztliche-bundesvereinigung/miotestdata/` unter `/examples` gefunden werden. 

### Mitwirken 
Derzeit ist keine Mitwirkung von externen Entwicklern vorgesehen. Dies kann sich aber ändern. #stayTuned

Softwarefehler können über die [GitHub Issues](https://github.com/kassenaerztliche-bundesvereinigung/MIOViewer/issues) Seite gemeldet werden.
Über GitHub oder die Mail-Adresse support.mio@kbv.de können Fragen gestellt werden nachdem das FAQ konsultiert wurde. 

### Lizenz 

Diese Software ist unter der LGPLv3 Lizenz lizensiert worden - siehe <a href="./COPYING.LESSER">LICENSE</a> für Details. 
(c) 2020 - 2021 Kassenärztliche Bundesvereinigung KdöR

### Bekannte Fehler
* Durch einen Bug in Safari 14.0.0 ist die Verwendung des MIO Viewers in dieser Version nicht möglich. Daher sollte Chrome
oder Firefox genutzt werden, bzw. ein neuerer Release von Safari.