package allType

type UserInfoForHTTPGet struct {
	Id       string `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}
type UserInfoForHTTPPost struct {
	Id       string `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type UserContributeForGet struct {
	Sent     int `json:"contributeSent"`
	Received int `json:"contributeReceived"`
}
type UserContributeForReceiverRanking struct {
	Username string `json:"username"`
	Received int    `json:"contributeReceived"`
}
type UserContributeForServerRanking struct {
	Username string `json:"username"`
	Sent     int    `json:"contributeSent"`
}

type UserProfileForHTTPPost struct {
	Username     string `json:"username"`
	Nickname     string `json:"nickname"`
	Introduction string `json:"introduction"`
}

type UserProfileForHTTPGet struct {
	Username     string `json:"username"`
	Nickname     string `json:"nickname"`
	Introduction string `json:"introduction"`
}

type ContributeLogForReceived struct {
	Id         string `json:"id"`
	ServerName string `json:"serverName"`
	SendPoint  int    `json:"sendPoint"`
	Message    string `json:"message"`
}
type ContributeLogForHTTPPost struct {
	Id           string `json:"id"`
	ServerName   string `json:"serverName"`
	ReceiverName string `json:"receiverName"`
	SendPoint    int    `json:"sendPoint"`
	Message      string `json:"message"`
}
type ContributeLogForSent struct {
	Id           string `json:"id"`
	ReceiverName string `json:"receiverName"`
	SendPoint    int    `json:"sendPoint"`
	Message      string `json:"message"`
}

type ChatForHTTPGet struct {
	Id          string `json:"id"`
	UserName    string `json:"username"`
	TextMessage string `json:"textMessage"`
}
type ChatForHTTPPost struct {
	Id          string `json:"id"`
	UserName    string `json:"username"`
	TextMessage string `json:"textMessage"`
}
