# assessment-5 - Beehive Inspection Management App

An application that tracks relevant information related to periodic hive inspections.  Things like general observations, current weather, whether the queen was sighted, brood state, evidence of disease, medications applied, amount of honey and brood, etc. The site would accommodate multiple users each with one or many hives to manage.

## APIs
Two APIs that I'd use would be just a general weather API, but also one specific to pollen count and pollen type, as pollen serves as a good indicator of the kind of nectar that the bees would be foraging and this translates (somewhat) into the flavor of the honey they produce.

Weather: OpenWeather - https://openweathermap.org/api
    Current temperature and humidity (wind speed and precipitation?)

Pollen count and type: Ambee (not specific to bees) - https://www.getambee.com/api/pollen

(Potentially) Mapping: MapBox - https://docs.mapbox.com/api/maps/

## Database Models
### Apiarist/beekeeper (AbstractUser)
    (used for authentication)
    (used to filter for beekeeper's hives)
    - email (models.EmailField)
    - first_name (CharField 16)
    - last_name (CharField 16)
    - Other?
### Hive
    - ID (specific to each individual hive) (auto-generated)
    - nickname (CharField 32)
    - location (CharField 32) OR
        - location.lat ()
        - location.long
    - installation date (DateField)
    - frames (8 or 10) (IntegerField)
    - depth of main body (CharField 7 - dropdown: deep, medium, shallow)
    - active? (BooleanField)
    - breed (CharField 9 - dropdown: Italian, Carniolan, Buckfast, Russian, German,	Caucasian)
    - removal date? (DateField)
### Inspection
    - Hive (ForeignKey)
    - Apiarist (ForeignKey)

    - date/time (DateTimeField) OR
        - date (DateField)
        - time (TimeField)
    - weather: temperature (DecimalField)
    - weather: humdidity (DecimalField)
    - pollen: primary type(s) (CharField 32?)
    - pollen: count (IntegerField max=4) (highest ever = 9,369)
    - queen sighted? (BooleanField)
    - eggs/capped brood? (BooleanField)
    - queen cell(s) (BooleanField)
    - has swarmed? (BooleanField)
    - honey supers on? (BooleanField)
    - honey quantity (CharField 32?)
    - food/syrup? (CharField 18 - dropdown: 'syrup' or 'pollen supplement'
    - disease / parasites? (CharField 64)
    - medication(s) applied (CharField 32)
    - notes (CharField 255 - will this be enough?) (TextField?)

## Methods
- Create
    - Hive or inspection
- Read
    - Hive specifications or previous inspection info
- Update
    - Hive specifications
    - Previous inspections read-only?
- Delete
    - Hive
    - Inspections associated with deleted hive?