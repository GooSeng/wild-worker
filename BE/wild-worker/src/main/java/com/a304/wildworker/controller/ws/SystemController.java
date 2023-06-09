package com.a304.wildworker.controller.ws;

import com.a304.wildworker.common.WebSocketUtils;
import com.a304.wildworker.domain.activeuser.ActiveUser;
import com.a304.wildworker.domain.location.Location;
import com.a304.wildworker.dto.request.DominatorMessage;
import com.a304.wildworker.dto.response.StationWithUserResponse;
import com.a304.wildworker.dto.response.common.MiningType;
import com.a304.wildworker.dto.response.common.StationType;
import com.a304.wildworker.dto.response.common.WSBaseResponse;
import com.a304.wildworker.service.MiningService;
import com.a304.wildworker.service.SystemService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.web3j.crypto.CipherException;

@Slf4j
@Controller
@RequiredArgsConstructor
@MessageMapping("/system")
public class SystemController {

    private final SystemService systemService;
    private final MiningService miningService;

    private final SimpMessagingTemplate messagingTemplate;

    /* 사용자 좌표 주기적 수신 */
    @MessageMapping("/location")
    public void getUserLocation(@Header("simpSessionId") String sessionId,
            @Header("simpUser") ActiveUser user, Location location) {
        StationWithUserResponse stationWithUserResponse
                = systemService.checkUserLocation(user, location);

        // 역 변동이 있는 경우 NOTIFICATION
        if (stationWithUserResponse != null) {
            WSBaseResponse<StationWithUserResponse> response = WSBaseResponse.station(
                    StationType.STATUS).data(stationWithUserResponse);

            messagingTemplate.convertAndSendToUser(sessionId, "/queue", response,
                    WebSocketUtils.createHeaders(sessionId));
        }
    }

    /* 수동 채굴 - 종이 줍기 */
    @MessageMapping("/mining/collect")
    public void collectPaper(@Header("simpSessionId") String sessionId,
            @Header("simpUser") ActiveUser user) {
        int paperCount = miningService.manualMiningCollect(user.getUserId());

        // 현재까지 모은 종이개수 SEND
        WSBaseResponse<Integer> response = WSBaseResponse.mining(MiningType.PAPER_COUNT)
                .data(paperCount);

        messagingTemplate.convertAndSendToUser(sessionId, "/queue", response,
                WebSocketUtils.createHeaders(sessionId));
    }

    /* 수동 채굴 - 종이 팔기 */
    @MessageMapping("/mining/sell")
    public void sellPaper(@Header("simpSessionId") String sessionId,
            @Header("simpUser") ActiveUser user) throws CipherException, IOException {
        miningService.manualMiningSell(user.getUserId());

        // 초기화 된 종이개수 SEND
        WSBaseResponse<Integer> response = WSBaseResponse.mining(MiningType.PAPER_COUNT)
                .data(0);

        messagingTemplate.convertAndSendToUser(sessionId, "/queue", response,
                WebSocketUtils.createHeaders(sessionId));
    }

    /* 지배자의 한 마디 */
    @MessageMapping("/message")
    public void sendDominatorMessage(@Header("simpSessionId") String sessionId,
            @Header("simpUser") ActiveUser user, DominatorMessage message)
            throws CipherException, IOException {
        systemService.sendDominatorMessage(user.getUserId(), message);
    }
}
