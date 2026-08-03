package bettapcq.bloodyglyph.repositories;

import bettapcq.bloodyglyph.entities.QrCode;
import bettapcq.bloodyglyph.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QrCodesRepository extends JpaRepository<QrCode, Long> {

    List<QrCode> findByUser(User user);

    Optional<QrCode> findByQrIdAndUser(Long qrId, User user);
}
