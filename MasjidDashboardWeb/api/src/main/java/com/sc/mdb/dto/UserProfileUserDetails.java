package com.sc.mdb.dto;

import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
public class UserProfileUserDetails implements UserDetails {

  private final UserProfileDto user;
  private final Collection<String> roles;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of();
  }

  @Override
  public @Nullable String getPassword() {
    return "";
  }

  @Override
  public String getUsername() {
    return "";
  }
}
