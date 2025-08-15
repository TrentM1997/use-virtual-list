# Custom useVirtuoso Hook

## What: tiny react hook to batch render long lists, for smooth endless scroll

## Purpose 
- Reduces DOM node consumtion, lowering memory usage and render work for the browser to do per frame
- Great for learning virtualized rendering concepts

## API 
- useVirtuoso(items, batchLength?) -> { visible, loadMore, fullyLoaded }

## Usage
