package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AsocAdminTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AsocAdmin.class);
        AsocAdmin asocAdmin1 = new AsocAdmin();
        asocAdmin1.setId(1L);
        AsocAdmin asocAdmin2 = new AsocAdmin();
        asocAdmin2.setId(asocAdmin1.getId());
        assertThat(asocAdmin1).isEqualTo(asocAdmin2);
        asocAdmin2.setId(2L);
        assertThat(asocAdmin1).isNotEqualTo(asocAdmin2);
        asocAdmin1.setId(null);
        assertThat(asocAdmin1).isNotEqualTo(asocAdmin2);
    }
}
