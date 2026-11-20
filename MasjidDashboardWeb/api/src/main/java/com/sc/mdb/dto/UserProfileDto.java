package com.sc.mdb.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDto {
  private Long id;
  private String email;
  private Long companyId;
  private String userPassword;
  private String firstName;
  private String lastName;
  private String phoneNumber;
}
