package com.a304.wildworker.domain.minigame;

import com.a304.wildworker.domain.common.BaseEntity;
import com.a304.wildworker.domain.common.ResultCode;
import com.a304.wildworker.domain.common.RunCode;
import com.a304.wildworker.domain.user.User;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Getter
@Entity
@Table(name = "mini_game_log")
public class MiniGameLog extends BaseEntity {

    @ManyToOne(targetEntity = MiniGame.class, fetch = FetchType.LAZY)
    private MiniGame game;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User user1;
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    private User user2;
    @Enumerated
    @Column(nullable = false)
    private RunCode runCode;
    @Enumerated
    @Column(nullable = false)
    private ResultCode resultCode;
}
