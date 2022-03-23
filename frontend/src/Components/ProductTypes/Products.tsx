import React, { useContext } from "react";
import Endpoint from "../Endpoint";
import Context from "../../Context";
import ProductTypesContainer from "./ProductTypesContainer";
import { investmentsCategories, transformInvestmentsData } from "../../dataUtilities";
import { VictoryPie, VictoryStack, VictoryArea } from "victory";

const Products = () => {
  const { products } = useContext(Context);
  return (
    <ProductTypesContainer productType="Products">
      <div style={{display: 'flex'}}>
        <VictoryStack>
          <VictoryArea
            data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}]}
          />
          <VictoryArea
            data={[{x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}]}
          />
          <VictoryArea
            data={[{x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}]}
          />
        </VictoryStack>
        <VictoryPie/>
      </div>
      {products.includes("investments") && (
        <Endpoint
          endpoint="holdings"
          name="Investments"
          categories={investmentsCategories}
          schema="/investments/holdings/get/"
          description="Retrieve investment holdings on file with the bank,
        brokerage, or investment institution. Analyze over-exposure
        to market segments."
          transformData={transformInvestmentsData}
        />
      )}
    </ProductTypesContainer>
  );
};

Products.displayName = "Products";

export default Products;
