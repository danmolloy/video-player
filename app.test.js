import { act } from "react-dom/test-utils"
import { unmountComponentAtNode, render, createRoot } from "react-dom";
import Home from './pages/index.tsx'
let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
})

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})

describe("App", () => {
  it("Loads", () => {
    act(() => {
      render(<Home />, container)
    })
    
    expect(container.innerHTML).toMatchSnapshot()
  })

  it("Plays multiple videos sequentially", () => {})
  it("Has error page", () => {})
  it("Shows title of current video", () => {})
  it("Has nightmode", () => {})
  it("Has about page", () => {})
})

describe("Video Player", () => {
  it("Shows loading indicator based on state of video player", async () => {
    act(() => {
      render(<Home />, container)
    })
    await act(async () => {
      await new Promise(res => setTimeout(res, 1000))
    })
    console.log(container.textContent)
  })

  it("Has play/pause button", () => {})
  it("Has volume button", () => {})
  it("Has progress bar with seeking feature", () => {})
  it("Has full screen toggle", () => {})
  it("Shows elapsed time and total time in HH:MM", () => {})
  it("Playback speed control", () => {})
  it("Next video button", () => {})
})


describe("Playlist", () => {
  it("Displays file names rather than full URL", () => {})
  it("Highlights current selected movie", () => {})
  it("Capitalize each word of fileName", () => {})
  it("If final video ends, plays first video", () => {})
})