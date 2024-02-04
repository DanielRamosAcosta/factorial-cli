# factorial-cli

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/DanielRamosAcosta/factorial-cli/ci.yml?branch=main)](https://github.com/DanielRamosAcosta/factorial-cli/actions)
[![npm](https://img.shields.io/npm/v/factorial-cli)](https://www.npmjs.com/package/factorial-cli)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/DanielRamosAcosta/factorial-cli/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

Fill your factorial shifts with ease

[![asciicast](https://asciinema.org/a/pbJ7VoYhm4NsW7qv9XRaS3Uzk.svg)](https://asciinema.org/a/pbJ7VoYhm4NsW7qv9XRaS3Uzk)

## Installation

```sh
npm install -g factorial-cli
export FACTORIAL_USER_EMAIL=your-email
export FACTORIAL_USER_PASSWORD=your-password
factorial fill-shifts
# done!
```

## Usage

```
Fills the shifts until today. If it's on the first days of the month, it will fill the previous month instead.
  factorial fill-shifts

USAGE:
    factorial fill-shifts [OPTIONS]
OPTIONS:
    -y, --year <YEAR>
            Sets the year to fill the shifts. Defaults to current year.

    -m, --month <MONTH>
            Sets the month to fill the shifts. Defaults to current month.

    -e, --email <EMAIL>
            The email of your factorial account. Also configurable via FACTORIAL_USER_EMAIL env variable.

    -p, --password <PASSWORD>
            The password of your factorial account. Also configurable via FACTORIAL_USER_PASSWORD env variable.

    -r, --randomness <RANDOMNESS>
            The amount of minutes to add or substract to the default entry and exit times.
    
    -o, --project <PROJECT>
            The project you want to set to fill shifts.

        --entryTime <ENTRY_TIME>
            The default entry time you want to set to fill shifts. Default is 8am.
        
        --exitTime <EXIT_TIME>
            The default exit time you want to set to fill shifts. Default is 8 hours after entry time.
```
