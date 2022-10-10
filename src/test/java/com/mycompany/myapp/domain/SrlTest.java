package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SrlTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Srl.class);
        Srl srl1 = new Srl();
        srl1.setId(1L);
        Srl srl2 = new Srl();
        srl2.setId(srl1.getId());
        assertThat(srl1).isEqualTo(srl2);
        srl2.setId(2L);
        assertThat(srl1).isNotEqualTo(srl2);
        srl1.setId(null);
        assertThat(srl1).isNotEqualTo(srl2);
    }
}
