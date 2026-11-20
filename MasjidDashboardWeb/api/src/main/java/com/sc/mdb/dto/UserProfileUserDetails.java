package com.sc.mdb.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@RequiredArgsConstructor
@Getter
public class UserProfileUserDetails implements UserDetails {

  private final UserProfileDto user;
  private final Collection<String> roles;

  public Long getCompanyId() {
    return user.getCompanyId();
  }

  public Long getUserId() {
    return user.getId();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return roles.stream()
        .filter(role -> !role.isBlank())
        .map(SimpleGrantedAuthority::new)
        .toList();
  }

  @Override
  public @Nullable String getPassword() {
    return user.getUserPassword();
  }

  @Override
  public String getUsername() {
    return user.getEmail();
  }
}
