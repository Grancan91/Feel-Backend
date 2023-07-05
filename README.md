# Feel-Backend

This is the backend repository for the Feel application. It provides the necessary functionality to manage users and emotional records.

## Table `users`

The `users` table stores the information of registered users in the application. Below is the table structure:

| Column           | Type     | Description             |
|------------------|----------|-------------------------|
| id               | integer  | Primary key             |
| name             | varchar  | User's name             |
| age              | integer  | User's age              |
| genre            | varchar  | User's gender           |
| email            | varchar  | User's email            |
| password         | varchar  | User's password         |
| professional_email | varchar | Professional's email    |
| reminder_day     | integer  | Reminder day            |
| reminder_hour    | time     | Reminder hour           |
| reminder_send    | date     | Reminder send date      |

## Table `records`

The `records` table stores the emotional records made by the users. Below is the table structure:

| Column         | Type    | Description               |
|----------------|---------|---------------------------|
| id             | integer | Primary key               |
| emotion        | varchar | Experienced emotion       |
| emotion_url    | varchar | Emotion image URL         |
| cause          | varchar | Cause of the emotion      |
| symptom        | varchar | Related symptoms          |
| strategy       | varchar | Used coping strategy      |
| detail         | varchar | Additional details        |
| record_date    | date    | Record date               |

This README provides a basic description of the `users` and `records` table structures used in the Feel application backend.
