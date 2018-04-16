module Main exposing (..)

import Html exposing (..)
import Html.Events exposing (onInput)
import Html.Attributes exposing (class, defaultValue)


-- Model


type alias Model =
    { text : String }


initialModel : Model
initialModel =
    { text = "Foo" }


init : ( Model, Cmd Msg )
init =
    ( initialModel, Cmd.none )



-- Actions


type Msg
    = InputText String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        InputText val ->
            ( { model | text = val }, Cmd.none )



-- View


view : Model -> Html Msg
view model =
    section []
        [ div []
            [ section [ class "hero is-primary is-bold is-medium" ]
                [ div [ class "hero-body" ]
                    [ div [ class "container" ]
                        [ h1 [ class "title" ] [ text "Hello, Elm!" ]
                        ]
                    ]
                ]
            , section [ class "section" ]
                [ div [ class "container" ]
                    [ div [ class "content" ]
                        [ blockquote []
                            [ text "Text field value: "
                            , strong [] [ text model.text ]
                            ]
                        , section []
                            [ div [ class "container" ] [ textField model.text ]
                            ]
                        ]
                    ]
                ]
            ]
        ]


textField : String -> Html Msg
textField val =
    div [ class "control" ]
        [ input
            [ class "input"
            , defaultValue val
            , onInput InputText
            ]
            []
        ]



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- Main program


main : Program Never Model Msg
main =
    Html.program
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }
