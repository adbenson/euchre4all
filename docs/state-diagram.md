# Euchre 4 All State Diagrams

## New Game

```mermaid
stateDiagram
	[*] --> newGame
	newGame --> waitForPlayers

```

## Player Joins

```mermaid
stateDiagram
	state isGameFull <<choice>>
	newGame --> isGameFull: Player Joins
	isGameFull --> waitForPlayers: players < 4
	isGameFull --> START: players == 4	
```

## Gameplay

```mermaid
stateDiagram
	START --> DEAL
	state DEAL {
		state dealStart <<fork>>
		state dealEnd <<join>>
		dealStart --> distributeCards
		dealStart --> chooseDealer
		distributeCards --> dealEnd
		chooseDealer --> dealEnd
	}
	DEAL --> BID1
	state BID1 {
		state bid1_dealer <<choice>>
		state bid1_player <<choice>>
		state allPassed1 <<choice>>
		bid1_dealer --> DEALER_DISCARD: Dealer Pick Up
		bid1_dealer --> bid1_player: Dealer Pass
		bid1_player --> allPassed1: Player Pass
		allPassed1 --> bid1_player
		allPassed1 --> BID2: All passed
		bid1_player --> DEALER_DISCARD: Player Order Up
	}
	state DEALER_DISCARD {
		dealerDiscard --> PLAY_HAND
	}
	state BID2 {
		state bid2_player <<choice>>
		state all_passed2 <<choice>>
		bid2_player --> PLAY_HAND: Player order up
		bid2_player --> all_passed2: Player pass
		all_passed2 --> bid2_player
		all_passed2 --> screwDealer: Last player passed
		screwDealer --> dealerOrderUp
		dealerOrderUp --> PLAY_HAND
		
	}

```

## Start Game

```mermaid
stateDiagram
	state pickOrPass_dealer <<choice>>
	state pickOrPass_player <<choice>>
	state allPassed <<choice>>
	startGame --> startHand
	startHand --> dealCards
	dealCards --> bidRound1
	dealCards --> chooseDealer
	chooseDealer --> pickOrPass_dealer
	pickOrPass_dealer --> exchangeUpcard: Dealer Pick Up
	pickOrPass_dealer --> pickOrPass_player: Dealer Pass
	pickOrPass_player --> allPassed: Player Pass
	allPassed --> pickOrPass_player
	allPassed --> 
	pickOrPass_player --> exchangeUpcard: Player Pick Up
	exchangeUpcard --> playHand
	playHand --> pickPlayer
```

## Deal

```mermaid
stateDiagram
	

```

## Bid Round 1

```mermaid
stateDiagram

```

## Bid Round 2

```mermaid
stateDiagram

```

## Dealer Discard

```mermaid
stateDiagram

```

## Play Hand

```mermaid
stateDiagram

```

## Score Round

```mermaid
stateDiagram

```

## Score Hand

```mermaid
stateDiagram

```

## End

```mermaid
stateDiagram

```
