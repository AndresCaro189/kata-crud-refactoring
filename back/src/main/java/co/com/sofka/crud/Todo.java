package co.com.sofka.crud;

import org.hibernate.validator.constraints.Length;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.Pattern;

@Entity
public class Todo {
    @Id
    @GeneratedValue
    private Long id;
    @Length(min=3, max=100)
    @Pattern(regexp = "[a-zA-Z0-9@\\s]+", message = "No permite caracteres especiales")
    private String name;
    private boolean completed;
    private String groupListId = "Cliente";

    public String getGroupListId() {
        return groupListId;
    }

    public void setGroupListId(String groupListId) {
        this.groupListId = groupListId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
