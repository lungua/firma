package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CapitalSocialTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CapitalSocial.class);
        CapitalSocial capitalSocial1 = new CapitalSocial();
        capitalSocial1.setId(1L);
        CapitalSocial capitalSocial2 = new CapitalSocial();
        capitalSocial2.setId(capitalSocial1.getId());
        assertThat(capitalSocial1).isEqualTo(capitalSocial2);
        capitalSocial2.setId(2L);
        assertThat(capitalSocial1).isNotEqualTo(capitalSocial2);
        capitalSocial1.setId(null);
        assertThat(capitalSocial1).isNotEqualTo(capitalSocial2);
    }
}
