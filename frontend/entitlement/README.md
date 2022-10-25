## Entitlement for Slack frontend

## Introduction

---

Entitlement for Slack is a PEP reference implementation that integrate Slack with CloudAz, an 
authorisation service on the Cloud. This document provides a quick guidance on how to build and 
deploy CloudAz for Slack.

## Technology Stack Requirements

* Frontend UI: Dart 2.5.x and Angular Dart 6.0

## Environment Setup
[Setup for Development](https://webdev.dartlang.org/angular/guide/setup) page
of [Dart for the web](https://webdev.dartlang.org).

## Installation

* Go to frontend/entitlement directory
* Install all the required dependencies

    `pub get`

* Install the Web toolkit

    `pub global activate webdev`
    
* Build the frontend UI by running the following command 

    `webdev build -o web:..\..\src\web\entitlement`

* Alternatively run "build.cmd" on windows or "build.sh" on Linux

* (Only for development) Run the build in web server for hot reloading
  
    `webdev serve`
