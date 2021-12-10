# Tasty Kitchens

## _(SWIGGY/ZOMATO CLONE)_

In this project Tasty Kitchens, App that will fetch data from an internal server using a **class component**, displaying that data, using **component lifecycle methods**, **routing concepts**, **authentication, and authorization**, and adding responsiveness to the website.

## Design Files

- You can check the Design Files for different devices [here](https://www.figma.com/file/5DK9nvTWZ4W0ytHtDrDe56/Tasty_Kitchens).

## Setup Instructions

- Download dependencies by running **npm install**
- Start up the app using **npm start**

## App Functionality

- _Login Route_
  - Users able to login to their account by entering a valid username and password.
- Users able to navigate to Home, Cart routes using links in Navbar.
- When the data is being fetching then the Loading view displayed to the user.
- Users able to view the website responsively in mobile view, tablet view as well.

- _Home Route_

  - Navbar contain the application title with logo, Home, Cart, and Logout button.
  - Users able to navigate to Home route when clicking on **TASTY KITCHENS** logo.
  - Users able to see carousel images with its offer details.
  - Users able to see Popular Restaurants.
  - Users able to see the sort by icon as shown in the Figma
  - The default value for the Sort By filter should be **Lowest**
  - Users able to select the sort by icon and able to see the Popular Restaurants based on the **Highest** and **Lowest** Ratings.
  - Users able to sort the list of Restaurants based on their ratings.
    - When user clicked the Lowest the Restaurants list should be displayed in Lowest ratings to Highest ratings
    - When user clicked the Highest the Restaurants list should be displayed in Highest ratings to Lowest ratings.
  - Users can browse popular Restaurants using pagination buttons.
  - Users able to see Home with highlighted text in Navbar.

- _Specific Restaurant details Route_

  - When users click a restaurant in a particular list, it open a new page with respective restaurant details.
  - Users able to see food items list

- _Cart Route_

  - Users able to select the Cart link in the navbar and be able to view their selected Food items, each food item quantity, and price of each food item in a separate page.
  - Users able to increase or decrease their each food item quantity and price should increase or decrease appropriately.
  - Users able to see their order total, Cart with highlighted text in Navbar
  - Users able to see Cart Items even after the app is refreshed.

- _Logout Button_
  - Users can able to logout from accounts page.
- User sable to view the website responsively in mobile view
- When the users enter invalid route in the URL then the Page not found Route is displayed.

## Data Fetch URL's

- _Valid credentials_

  - username: rahul
  - password: rahul@2021

- _Login Route_

  - https://apis.ccbp.in/login

- _Home Route_

  - Carousel Images
  - https://apis.ccbp.in/restaurants-list/offers

- _Restaurants List_

  - https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}

- _SortBy Functionality_

  - https://apis.ccbp.in/restaurants-list?sort_by_rating={selectedSortByValue}

- _Specific Restaurant Details Route:_
  - Get Restaurant Details:
  - https://apis.ccbp.in/restaurants-list/${restrauntId}
