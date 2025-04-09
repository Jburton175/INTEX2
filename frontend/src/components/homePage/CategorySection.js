import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./CategorySection.module.css";
import CategoryCard from "./CategoryCard";
const CategorySection = () => {
    const categories = [
        {
            name: "Action",
            images: [
                "https://cdn.builder.io/api/v1/image/assets/TEMP/22571d6d02299166315a1862386e4f9f63c1e2f9",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/941cb713ae2871751cf410477e2eb56fb728a405",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/ec9c61f1596069b6e9301cdadc043b04563e690b",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/60eb03911c3f5a0ad74b27a5ccc43575cb119423",
            ],
        },
        {
            name: "Adventure",
            images: [
                "https://cdn.builder.io/api/v1/image/assets/TEMP/19d0ff54c94edab320b066bc32a153bcd32bcc63",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/170cc383b15df9034a52ad30edbcac6043e40357",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/d03105e0b2dc61eb8e9e262a8ff8d732a42d478d",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/38da567686038c055d53b979370734b137ecd726",
            ],
        },
        {
            name: "Comedy",
            images: [
                "https://cdn.builder.io/api/v1/image/assets/TEMP/bf367215a010ee8c820a97c4642adcb2393dd8fb",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/2f3b5c2cdc48e510acf2a6cf90ba5630618df663",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/c21a7ab67daba34b68b1b9463b7882dd80e085a4",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/03941793ca198ec183c29a826b3444bd88e17ea0",
            ],
        },
        {
            name: "Drama",
            images: [
                "https://cdn.builder.io/api/v1/image/assets/TEMP/9d8573299252b17ba3d7c1957e5798428ce57c19",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/f3014aa61abe47e85a7dda6753d8788a94230273",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/6d547126481d58a0c0d06643a0c832fceb620e63",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/d52521c0e01f95c79f329616509a7ca9b2364089",
            ],
        },
        {
            name: "Horror",
            images: [
                "https://cdn.builder.io/api/v1/image/assets/TEMP/a57bb65e05f9630aaff1f4b052f2ae5ccee5349b",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/339d55bba6ea5f12bc1e428a587cbf00e85c9c80",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/0a97934ad9baedf4dc4fdcdb73dfaea9c380a389",
                "https://cdn.builder.io/api/v1/image/assets/TEMP/8b6ae43dda85354afc49326fe27ece1ea54f1491",
            ],
        },
    ];
    return (_jsxs("section", { className: styles.categorySection, children: [_jsxs("div", { className: styles.sectionHeader, children: [_jsx("h2", { className: styles.sectionTitle, children: "Explore our wide variety of categories" }), _jsx("p", { className: styles.sectionDescription, children: "Explore a growing catalog of carefully selected films and shows" })] }), _jsx("div", { className: styles.categoryGrid, children: categories.map((category, index) => (_jsx(CategoryCard, { name: category.name, images: category.images }, index))) })] }));
};
export default CategorySection;
