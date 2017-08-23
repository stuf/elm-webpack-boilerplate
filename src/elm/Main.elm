module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class)


main : Html a
main =
    div [ class "container" ]
        [ div
            [ class "jumbotron" ]
            [ text "Hello World!" ]
        ]
