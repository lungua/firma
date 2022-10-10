package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProprietariTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Proprietari.class);
        Proprietari proprietari1 = new Proprietari();
        proprietari1.setId(1L);
        Proprietari proprietari2 = new Proprietari();
        proprietari2.setId(proprietari1.getId());
        assertThat(proprietari1).isEqualTo(proprietari2);
        proprietari2.setId(2L);
        assertThat(proprietari1).isNotEqualTo(proprietari2);
        proprietari1.setId(null);
        assertThat(proprietari1).isNotEqualTo(proprietari2);
    }
}
