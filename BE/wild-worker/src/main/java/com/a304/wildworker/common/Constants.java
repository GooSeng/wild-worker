package com.a304.wildworker.common;

public final class Constants {

    //key of Session cookie
    public static final String KEY_SESSION_ID = "SESSION";

    //Session attribute names
    public static final String SESSION_NAME_ACCESS_TOKEN = "access_token";
    public static final String SESSION_NAME_PREV_PAGE = "prev_page";

    // 스케줄러 동작 주기 (minute)
    public static final int INTERVAL = 10;

    // 역
    public static final int STATION_RANGE = 10000;    // 역 범위(반지름) (meter)
    public static final Long ROOT_STATION_ID = -1L; // 루트 Station ID

    // 채굴
    public static final int SELL_LIMIT = 30;   //수동 채굴 가능한 종이 개수
    public static final long AMOUNT_MANUAL_MINE = 100L; //수동 채굴 금액
    public static final long AMOUNT_AUTO_MINE = 100L;   //자동 채굴 금액

    public static final int SELECTING_DELAY_TIME = 4;   //선택 여유 시간

    public static final double COMMISSION_RATE = 0.5;   //게임 수수료 비율(%)

    public static final String DEFAULT_USER_NAME = "직장인";
}