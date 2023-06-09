package com.a304.wildworker.domain.title.strategy;

import com.a304.wildworker.domain.common.RunCode;
import com.a304.wildworker.domain.common.TitleCode;
import com.a304.wildworker.domain.minigame.MiniGameLog;
import com.a304.wildworker.domain.minigame.MiniGameLogRepository;
import com.a304.wildworker.domain.title.TitleRepository;
import com.a304.wildworker.domain.user.UserRepository;
import java.util.List;

public class RiskTakerStrategy extends TitleStrategy {

    public RiskTakerStrategy(UserRepository userRepository, TitleRepository titleRepository,
            MiniGameLogRepository miniGameLogRepository) {
        super(userRepository, titleRepository, miniGameLogRepository);
    }

    public boolean checkTitle(Long userId) {
        // 최근 게임로그 가져오기
        List<MiniGameLog> gameLogList
                = getGameLogByCount(userId, TitleCode.RISK_TAKER.getCondition());
        boolean getTitle = true;

        if (gameLogList.size() < TitleCode.RISK_TAKER.getCondition()) {
            getTitle = false;
        } else {
            for (MiniGameLog gameLog : gameLogList) {
                RunCode runCode = gameLog.getRunCode();

                // 둘 다 도망친 경우
                if (runCode == RunCode.ALL) {
                    getTitle = false;
                    break;
                }

                // 내가 user1 && user1이 도망친 경우
                if (gameLog.getUser1().getId().equals(userId)) {
                    if (runCode == RunCode.USER1) {
                        getTitle = false;
                        break;
                    }
                }
                // 내가 user2 && user2가 도망친 경우
                else {
                    if (runCode == RunCode.USER2) {
                        getTitle = false;
                        break;
                    }
                }
            }
        }

        return getTitle;
    }
}
