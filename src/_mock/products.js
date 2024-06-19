import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const PRODUCT_NAME =[
  "AWS",
  "Android",
  "Big Data Master Program",
  "DevOps",
  "Data Analytics",
  "Data Science Python",
  "HTML",
  "Javascript",
  "Java Full Stack Training In Marathahalli",
  "Linux",
  "Power BI",
  "Python Full Stack Training In Marathahalli",
  "React Js",
  "SQL",
  "Software Training",
  "Tableau"
];
const PRODUCT_COLOR = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

const courseImages = [
  "https://i.ytimg.com/vi/TSGnWlGmSds/maxresdefault.jpg", // Replace with an actual AWS image URL
  "https://c4.wallpaperflare.com/wallpaper/416/113/278/android-operating-system-blurred-technology-operating-system-wallpaper-preview.jpg", // Replace with an actual Android image URL
  "https://www.simplilearn.com/ice9/free_resources_article_thumb/Big_Data_Masters_Program_course_review.jpg",
  "https://media.licdn.com/dms/image/D4D12AQGWcSInOgklkw/article-cover_image-shrink_600_2000/0/1664800435918?e=2147483647&v=beta&t=Q4otFvD0-FQtg0vWQtvVCGGg0dxaKfMKyVRlEI7GfCw", // Replace with an actual DevOps image URL
  "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220926110021/How-to-Become-a-Data-Analyst-Complete-Roadmap.png", // Replace with an actual Data Analytics image URL
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJH9M1tYvFAalP2k00Wh-OU_aHN6Kz8e31Ww&s", // Replace with an actual Data Science Python image URL
  "https://example.com/images/html.png", // Replace with an actual HTML image URL
  "https://example.com/images/javascript.png", // Replace with an actual Javascript image URL
  "https://example.com/images/java-full-stack-training-in-marathahalli.png", // Replace with an actual Java Full Stack Training In Marathahalli image URL
  "https://example.com/images/linux.png", // Replace with an actual Linux image URL
  "https://example.com/images/power-bi.png", // Replace with an actual Power BI image URL
  "https://example.com/images/python-full-stack-training-in-marathahalli.png", // Replace with an actual Python Full Stack Training In Marathahalli image URL
  "https://example.com/images/react-js.png", // Replace with an actual React Js image URL
  "https://example.com/images/sql.png", // Replace with an actual SQL image URL
  "https://example.com/images/software-training.png", // Replace with an actual Software Training image URL
  "https://example.com/images/tableau.png" // Replace with an actual Tableau image URL
];



// ----------------------------------------------------------------------

export const products = [...Array(6)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.string.uuid(),
    cover: courseImages[index],
    name: PRODUCT_NAME[index],
    price: faker.number.int({ min: 4, max: 99, precision: 0.01 }),
    priceSale: setIndex % 3 ? null : faker.number.int({ min: 19, max: 29, precision: 0.01 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['sale', 'new', '', '']),
  };
});
