package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DovadaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Dovada.class);
        Dovada dovada1 = new Dovada();
        dovada1.setId(1L);
        Dovada dovada2 = new Dovada();
        dovada2.setId(dovada1.getId());
        assertThat(dovada1).isEqualTo(dovada2);
        dovada2.setId(2L);
        assertThat(dovada1).isNotEqualTo(dovada2);
        dovada1.setId(null);
        assertThat(dovada1).isNotEqualTo(dovada2);
    }
}
