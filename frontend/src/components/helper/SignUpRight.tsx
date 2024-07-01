import {Vortex} from "../ui/vortex"

export const SignUpRight = () => {
  return (
    <div className="h-screen flex items-center justify-center w-[calc(100%)] mx-auto overflow-hidden">
    <Vortex
        backgroundColor="black"
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        
<figure className="max-w-screen-md mx-auto text-center ">
    <svg className="w-10 h-10 mx-auto mb-4 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
    </svg>
    <blockquote className='max-w-md mx-4'>
    <h2 className="text-white text-3xl font-bold text-center">
        "Words have the power to shape minds and change perspectives. Start sharing your thoughts and ideas—it's how knowledge spreads."
        </h2>
    </blockquote>
</figure>

      </Vortex>
    </div>
  )
}
