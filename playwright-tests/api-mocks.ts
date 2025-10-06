import { Page } from "@playwright/test";

// Mock data that matches the API structure
export const mockPies = [
  // Seasonal Pies
  {
    id: "s1",
    name: "Pumpkin Pie",
    price: 14.95,
    description: "Perfect for any holiday gathering",
    category: "seasonal",
    image: "/images/Seasonal/pie-1.png",
  },
  {
    id: "s2",
    name: "Pecan Pie",
    price: 15.95,
    description: "Traditional southern style pecan pie",
    category: "seasonal",
    image: "/images/Seasonal/pie-2.png",
  },
  {
    id: "s3",
    name: "Sweet Potato Pie",
    price: 13.95,
    description: "Classic holiday favorite with warm spices",
    category: "seasonal",
    image: "/images/Seasonal/pie-3.png",
  },
  // Fruit Pies
  {
    id: "f1",
    name: "Classic Apple Pie",
    price: 12.95,
    description: "Made with fresh apples and a flaky crust",
    category: "fruit",
    image: "/images/Fruit/fruit1.png",
  },
  {
    id: "f2",
    name: "Cherry Pie",
    price: 13.95,
    description: "Sweet and tart cherries in a buttery crust",
    category: "fruit",
    image: "/images/Fruit/fruit2.png",
  },
  {
    id: "f3",
    name: "Blueberry Pie",
    price: 13.95,
    description: "Bursting with fresh blueberries",
    category: "fruit",
    image: "/images/Fruit/fruit3.png",
  },
  // Cheesecakes
  {
    id: "c1",
    name: "Classic New York Cheesecake",
    price: 16.95,
    description: "Rich and creamy New York style cheesecake",
    category: "cheesecake",
    image: "/images/Cheesecakes/cheesecake1.jpg",
  },
  {
    id: "c2",
    name: "Chocolate Swirl Cheesecake",
    price: 17.95,
    description: "Marbled with rich chocolate throughout",
    category: "cheesecake",
    image: "/images/Cheesecakes/cheesecake2.jpg",
  },
  {
    id: "c3",
    name: "Strawberry Cheesecake",
    price: 17.95,
    description: "Topped with fresh strawberry compote",
    category: "cheesecake",
    image: "/images/Cheesecakes/cheesecake3.jpg",
  },
  {
    id: "c4",
    name: "Caramel Pecan Cheesecake",
    price: 18.95,
    description: "Drizzled with caramel and topped with pecans",
    category: "cheesecake",
    image: "/images/Cheesecakes/cheesecake4.jpg",
  },
  {
    id: "c5",
    name: "Lemon Cheesecake",
    price: 18.95,
    description: "A refreshing lemon cheesecake with a graham cracker crust",
    category: "cheesecake",
    image: "/images/Cheesecakes/cheesecake5.jpg",
  },
  {
    id: "c6",
    name: "Peach Cheesecake",
    price: 18.95,
    description: "A creamy peach cheesecake with a graham cracker crust",
    category: "cheesecake",
    image: "/images/Cheesecakes/cheesecake6.jpg",
  },
];

export const mockPiesOfTheMonth = [
  {
    id: "f2",
    name: "Cherry Pie",
    price: 13.95,
    description: "Sweet and tart cherries in a buttery crust",
    category: "fruit",
    image: "/images/Fruit/fruit2.png",
  },
  {
    id: "f3",
    name: "Blueberry Pie",
    price: 13.95,
    description: "Bursting with fresh blueberries",
    category: "fruit",
    image: "/images/Fruit/fruit3.png",
  },
  {
    id: "c3",
    name: "Strawberry Cheesecake",
    price: 17.95,
    description: "Topped with fresh strawberry compote",
    category: "cheesecake",
    image: "/images/Cheesecakes/cheesecake3.jpg",
  },
];

// Helper functions for API stubbing
export async function stubPiesAPI(page: Page, category?: string) {
  const filteredPies = category
    ? mockPies.filter((pie) => pie.category === category)
    : mockPies;

  await page.route("**/api/pies*", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(filteredPies),
    });
  });
}

export async function stubPiesOfTheMonthAPI(page: Page) {
  await page.route("**/api/pies-of-the-month*", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockPiesOfTheMonth),
    });
  });
}

export async function stubAllAPIs(page: Page) {
  await stubPiesAPI(page);
  await stubPiesOfTheMonthAPI(page);
}

// Get expected counts for each category
export function getExpectedCounts() {
  return {
    all: mockPies.length,
    seasonal: mockPies.filter((pie) => pie.category === "seasonal").length,
    fruit: mockPies.filter((pie) => pie.category === "fruit").length,
    cheesecake: mockPies.filter((pie) => pie.category === "cheesecake").length,
    monthly: mockPiesOfTheMonth.length,
  };
}
