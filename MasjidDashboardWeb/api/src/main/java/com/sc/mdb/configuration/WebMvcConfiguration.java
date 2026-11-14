package com.sc.mdb.configuration;

import org.jspecify.annotations.NonNull;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
        .addResourceHandler("/**")
        .addResourceLocations("classpath:/static/")
        .resourceChain(true)
        .addResolver(createSpaPathResolver());
  }

  private PathResourceResolver createSpaPathResolver() {
    return new PathResourceResolver(){
      @Override
      protected Resource getResource(@NonNull String resourcePath, @NonNull Resource location) throws IOException {
        Resource requestResource = location.createRelative(resourcePath);
        if (requestResource.exists() && requestResource.isReadable()) {
          return requestResource;
        } else {
          return new ClassPathResource("/static/index.html");
        }
      }
    };
  }
}
