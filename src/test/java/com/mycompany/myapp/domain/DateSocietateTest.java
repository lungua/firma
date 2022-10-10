package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DateSocietateTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DateSocietate.class);
        DateSocietate dateSocietate1 = new DateSocietate();
        dateSocietate1.setId(1L);
        DateSocietate dateSocietate2 = new DateSocietate();
        dateSocietate2.setId(dateSocietate1.getId());
        assertThat(dateSocietate1).isEqualTo(dateSocietate2);
        dateSocietate2.setId(2L);
        assertThat(dateSocietate1).isNotEqualTo(dateSocietate2);
        dateSocietate1.setId(null);
        assertThat(dateSocietate1).isNotEqualTo(dateSocietate2);
    }
}
