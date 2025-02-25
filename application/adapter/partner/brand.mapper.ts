import Brand, { BrandId, Logo } from "../../../domain/core/partner/brand.entity";
import { Partner } from "../../../domain/core/partner/enums/partner.enum";
import { TMF632BrandResponse } from "./tmf/response/dto/tmf-632.dto.interface";

export class BrandMapper {
    // Method to map the raw response to the Brand entity
    public static toDomain(response: TMF632BrandResponse): Brand {
        // Extract the relevant data from the response
        const brandId = new BrandId(
            response.body.partyCharacteristic.find(c => c.name === "brandId")?.value || ""
        );

        // Assuming logo is being fetched from the attachments (just as an example)
        const logo: Logo = {
            url: response.body.attachment[0]?.url || "", // Taking the first attachment's URL as logo (modify based on your logic)
            type: response.body.attachment[0]?.mimeType || "",
        };

        const nameTH = response.body.name;

        // Example logic for category and subcategory, modify as needed
        const category = Partner.Brand.Category.Food;  // Assuming category is fixed for now
        const subCategory = Partner.Brand.SubCategory.Restaurant; // Assuming subcategory is fixed for now

        // Return a new Brand instance
        return new Brand(brandId, logo, nameTH, category, subCategory);
    }
}