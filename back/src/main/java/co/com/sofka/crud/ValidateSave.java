package co.com.sofka.crud;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ValidateSave {

    void validateChar(Todo todo) {
        for (int i = 0; i < todo.getName().length(); i++) {
            if(isaBooleanchar(todo, i)){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Error no se permiten caracteres especiales");
            }
        }
    }

    private boolean isaBooleanchar(Todo todo, int i) {
        return isaBooleanCharCaracter(todo, i, '#') || isaBooleanCharCaracter(todo, i, '*')
                || isaBooleanCharCaracter(todo, i, '$') || isaBooleanCharCaracter(todo, i, '%')
                || isaBooleanCharCaracter(todo, i, '-');
    }

    private boolean isaBooleanCharCaracter(Todo todo, int i, char c) {
        return todo.getName().charAt(i) == c;
    }

    void validateLength(Todo todo) {
        if(todo.getName().length()<3 || todo.getName().length()>100){
            throw new IllegalArgumentException("Se permiten caracteres de 3 hasta 100");
        }
    }
}
