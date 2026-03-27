package mongodb.mongodb;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "grocery")
public class GroceryItem {

    @Id
    private String id;

    private String name;
    private double price;
    private int quantity;
}