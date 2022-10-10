package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BuletinTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Buletin.class);
        Buletin buletin1 = new Buletin();
        buletin1.setId(1L);
        Buletin buletin2 = new Buletin();
        buletin2.setId(buletin1.getId());
        assertThat(buletin1).isEqualTo(buletin2);
        buletin2.setId(2L);
        assertThat(buletin1).isNotEqualTo(buletin2);
        buletin1.setId(null);
        assertThat(buletin1).isNotEqualTo(buletin2);
    }
}
