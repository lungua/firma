package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SumaIncasataTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SumaIncasata.class);
        SumaIncasata sumaIncasata1 = new SumaIncasata();
        sumaIncasata1.setId(1L);
        SumaIncasata sumaIncasata2 = new SumaIncasata();
        sumaIncasata2.setId(sumaIncasata1.getId());
        assertThat(sumaIncasata1).isEqualTo(sumaIncasata2);
        sumaIncasata2.setId(2L);
        assertThat(sumaIncasata1).isNotEqualTo(sumaIncasata2);
        sumaIncasata1.setId(null);
        assertThat(sumaIncasata1).isNotEqualTo(sumaIncasata2);
    }
}
