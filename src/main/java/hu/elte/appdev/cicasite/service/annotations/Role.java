package hu.elte.appdev.cicasite.service.annotations;

import hu.elte.appdev.cicasite.model.entities.*;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Role {

	User.Role[] value() default {User.Role.GUEST};
}
