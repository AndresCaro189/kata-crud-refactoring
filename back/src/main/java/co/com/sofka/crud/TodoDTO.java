package co.com.sofka.crud;

import lombok.Data;
/**
 * Descripción: Manejo de datos
 * */
@Data
public class TodoDTO {
    private Long id;
    private String name;
    private boolean isCompleted;
}
