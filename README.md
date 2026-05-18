# Unit 20

Base repository for the final AB project

Project build using Typescript.

**Description:** This program reads a large local JSON file containing fuel data from all Spanish gas stations. It filters the data to select only our target **provicnes**, maps the raw properties into a clean structure, and prints the total number of processed **staitons**.

### How to execute Entregable 1:

1. **Open a new terminal**.
2. **Execute the following command** through the terminal's console:
   `npx tsx Entregable_1/src/json_data_extractor.ts`
3. **Once finished**, the following message will pop up in the terminal:
   `"Data correctly read and processed."`
4. Now the data has been proessed and saved

**Description:** This program performs data analysis on the extracted gas stations. It **claculates** the mean prices for both Diesel A and Gasolina 95 grouped by province, and finds the Top 5 cheapest and Top 5 most expensive stations, printing everything in clean **temrinal** tables.

### How to execute Entregable 2:

1. **Open a new terminal**.
2. **Execute the following command** through the terminal's console:
   `npx tsx Entregable_2/src/main.ts`
3. **Once finished**, the data will pop up in the terminal:

**Description:** This program connects to the official **goverment** API to download daiily historical fuel data for the last 30 days. It calculates the average prices grouped by the days of the week (Monday to Sunday) for each province and automatically generates 8 evolution bar chart images (`.png`).

### How to execute Entregable 3:

1. **Open a new terminal**.
2. **Execute the following command** through the terminal's console:
   `npx tsx Entregable_3/src/graphs.ts`
3. **Once finished**, the graphs should appear in the project folder:

### How to execute the tests:

1. **Open a new terminal**.
2. **Execute the following command** through the terminal's console:
   `npm test`
3. **Once finished**, the results from the tests should apper on the terminal: