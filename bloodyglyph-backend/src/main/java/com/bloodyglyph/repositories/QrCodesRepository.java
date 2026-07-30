package com.bloodyglyph.repositories;

import com.bloodyglyph.entities.QrCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QrCodesRepository extends JpaRepository<QrCode, Long> {

    List<QrCode> findByUserUserId(Long userId);
}
