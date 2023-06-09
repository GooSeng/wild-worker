package com.a304.wildworker.controller.rest;

import com.a304.wildworker.domain.sessionuser.PrincipalDetails;
import com.a304.wildworker.domain.sessionuser.SessionUser;
import com.a304.wildworker.dto.request.InvestmentRequest;
import com.a304.wildworker.dto.response.InvestmentInfoResponse;
import com.a304.wildworker.dto.response.MyInvestmentResponse;
import com.a304.wildworker.dto.response.StationRankResponse;
import com.a304.wildworker.exception.NotLoginException;
import com.a304.wildworker.service.InvestService;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.web3j.crypto.CipherException;

@Slf4j
@RestController
@RequestMapping("/investment")
@RequiredArgsConstructor
public class InvestmentController {

    private final InvestService investService;

    /* 실시간 역 순위 */
    @GetMapping
    public ResponseEntity<StationRankResponse> showStationRank(
            int size, String order, @AuthenticationPrincipal PrincipalDetails principal)
            throws IOException {

        StationRankResponse response = investService.showStationRank(size, order);
        return ResponseEntity.ok(response);
    }

    /* 해당 역에 대한 지분 조회 */
    @GetMapping("/{station-id}")
    public ResponseEntity<InvestmentInfoResponse> showInvestmentByStation(
            @PathVariable("station-id") Long stationId,
            @AuthenticationPrincipal PrincipalDetails principal)
            throws IOException {
        SessionUser user = Optional.of(principal.getSessionUser())
                .orElseThrow(NotLoginException::new);

        InvestmentInfoResponse response = investService.showInvestmentByStation(stationId,
                user.getId());
        return ResponseEntity.ok(response);
    }

    /* 역 투자 */
    @PostMapping("/{station-id}")
    public ResponseEntity<Void> investToStation(@PathVariable("station-id") Long stationId,
            @RequestBody InvestmentRequest investmentRequest,
            @AuthenticationPrincipal PrincipalDetails principal)
            throws CipherException, IOException {
        SessionUser user = Optional.of(principal.getSessionUser())
                .orElseThrow(NotLoginException::new);

        investService.investToStation(stationId, user.getId(), investmentRequest.getInvestment());

        return ResponseEntity.ok().build();
    }

    /* 나의 투자한 역 목록 */
    @GetMapping("/mine")
    public ResponseEntity<MyInvestmentResponse> showMyInvestment(
            String order, String ascend, @AuthenticationPrincipal PrincipalDetails principal)
            throws IOException {
        SessionUser user = Optional.of(principal.getSessionUser())
                .orElseThrow(NotLoginException::new);

        MyInvestmentResponse response = investService.showMyInvestment(user.getId(), order, ascend);
        return ResponseEntity.ok(response);
    }
}
