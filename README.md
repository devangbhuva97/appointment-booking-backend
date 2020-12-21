# Appointment Booking

### Prerequisites
Make sure you have already installed both [Node](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/).

#### 1. Setting up Configuration
Copy `config/local-sample.json` to `config/local.json`
```
cp config/local-sample.json config/local.json
```

Get firestore config from google console and copy into `config` folder as `service-account.json` and also update firestore `project_id` in `local.json`.

#### 2. Install Application Dependencies
To application dependencies, use
```
yarn install
```


#### 3. Start Application
To start applications, use
```
yarn start
```

Application will start on `http://localhost:3000/graphql`


##### Queries
1. To get free slots
    ```
    query free_slots($date: String! $timezone: String!) {
      free_slots(date: $date timezone: $timezone)
    }
    ```
    ```
    {
      "date": "2020-12-28",
      "timezone": "US/Eastern"
    }
    ```

2. To get booked events
    ```
    query events($start_date: String! $end_date: String! $timezone: String!) {
      events(start_date: $start_date end_date: $end_date, timezone: $timezone) {
        start_time
        end_time
      }
    }
    ```
    ```
    {
      "start_date": "2020-12-28",
      "end_date": "2020-12-28",
      "timezone": "US/Eastern"
    }
    ```

##### Mutation
1. To create event
    ```
    mutation create_event($data: CreateEventInput!) {
      create_event(data: $data) {
        data
        message
        success
      }
    }
    ```
    ```
    {
      "data": {
        "date_time": "2020-12-28 02:00 PM",
        "duration": 50,
        "timezone": "US/Eastern"
      }
    }
    ```   