package com.sc.mdb.dto;

import com.sc.mdb.entity.UserProfile;
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

  public UserProfileDto(UserProfile user) {
    this.id = user.getId();
    this.email = user.getEmail();
    this.companyId = user.getCompany() == null ? null : user.getCompany().getId();
    this.userPassword = user.getUserPassword();
    this.firstName = user.getFirstName();
    this.lastName = user.getLastName();
    this.phoneNumber = user.getPhoneNumber();
  }
}
