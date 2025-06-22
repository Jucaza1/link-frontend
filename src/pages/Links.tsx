import { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableRow, TableHead, TableBody, TableCell, TableHeader } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { UserContext } from '@/context/UserContext';
import { Link_DTO, Link_DTO_Create } from '@/types/link';
import { dateToHumanReadable, purgeLocalStorage } from '@/util/helpers';
import { API_URL } from '@/config';

export function Links() {
    const [links, setLinks] = useState([] as Link_DTO[]);
    const [newLink, setNewLink] = useState('')
    const { isLoggedIn, user, setIsLoggedIn } = useContext(UserContext)
    const [errors, setErrors] = useState<string[]>([])

    useEffect(() => {
        async function fetchLinks() {
            // If not logged in, check local storage for links
            if (!isLoggedIn) {
                const storedLinks = localStorage.getItem('links')
                if (storedLinks) {
                    setLinks(JSON.parse(storedLinks))
                    return;
                }
            }
            // Simulate fetching data
            // const fetchedLinks: Link_DTO[] = [
            //     // { id: 1, short: "http://link.jucaza.dev/1", url: 'https://example.com', description: 'Example Link' },
            //     // { id: 2, short: "http://link.jucaza.dev/2", url: 'https://another-example.com', description: 'Another Example' }
            //     {
            //         short: "http://link.jucaza.dev/1",
            //         url: 'https://example.com......................................................................................................................',
            //         status: true,
            //         userID: isLoggedIn ? 'user123' : null, // Mocked user ID
            //         createdAt: new Date().toISOString(),
            //         expiresAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
            //     }, {
            //         short: "http://link.jucaza.dev/2",
            //         url: 'https://another-example.com',
            //         status: true,
            //         userID: isLoggedIn ? 'user123' : null, // Mocked user ID
            //         createdAt: new Date().toISOString(),
            //         expiresAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
            //     }
            // ]
            let response;
            const userID = user?.ID ?? localStorage.getItem('userID')
            try {
                response = await fetch(`${API_URL}/users/${userID}/links`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-authorization': `${localStorage.getItem('x-authorization')}`
                    }
                })
            } catch (error) {
                console.error('Error fetching links:', error)
                toast.error('Failed to load links. Please try again later.')
                return
            }
            console.log('Response:', response)
            if (!response.ok) {
                if (response.status === 401) {
                    toast.error('Unauthorized. Please log in again.')
                    purgeLocalStorage()
                    setIsLoggedIn(false)
                    return
                }
            };
            const data = await response.json() as Link_DTO[]
            setLinks(data)
        }
        fetchLinks()
    }, [isLoggedIn])

    const handleAddLink = () => {
        if (!newLink) {
            toast.error('Please enter a link')
            return
        }
        // SEnd to the SERVER
        // Post and response will be stored

        async function postLink(link: Link_DTO_Create) {
            // Simulate a POST request to the server
            // In a real application, you would use fetch or axios to send the data to your backend
            // if we are logged we send to the guest endpoint otherwise to the link post endpoint
            let response;
            try {
                response = await fetch(`${API_URL}${isLoggedIn ? '/links' : '/guestlinks'}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-authorization': isLoggedIn ? `${localStorage.getItem('x-authorization')}` : '',
                    },
                    body: JSON.stringify(link),
                })
            } catch (error) {
                console.error('Error posting link:', error)
                toast.error('Failed to add link. Please try again.')
                return
            }
            if (!response.ok) {
                try{
                    const errorData: string[] = (await response.json()).error as string[];
                    console.error('Error data:', errorData);
                    setErrors(errorData)
                } catch (e) {
                    console.error('Error parsing error response:', e);
                    setErrors([`Error ${response.status}: ${response.statusText}`])
                }
                switch (response.status) {
                    case 400:
                        toast.error('Invalid link format. Please enter a valid URL.')
                        break
                    case 429:
                        toast.error(`Too many requests. Please wait ${response.headers.get('Retry-After')} seconds.`)
                        break
                    default:
                        toast.error('An error occurred while adding the link. Please try again later.')
                }
                return
            }
            setErrors([])

            const data = await response.json() as Link_DTO
            setLinks(prevLinks => [...prevLinks, data])
            console.log('Posting link:', link)
            // const newLinkObj: Link_DTO = {
            //     short: `http://link.jucaza.dev/${links.length + 1}`, // Mocked short link
            //     url: newLink,
            //     status: true,
            //     userID: isLoggedIn ? 'user123' : null, // Mocked user ID
            //     createdAt: new Date().toISOString(),
            //     expiresAt: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
            // }
            // setLinks([...links, newLinkObj])
            setNewLink('')
            if (!isLoggedIn) {
                localStorage.setItem('links', JSON.stringify([...links, data]))
                toast.success('Link added successfully (saved locally)')
                return
            }
            toast.success('Link added successfully')
            return data
        }
        postLink({ url: newLink })
            .then((data) => {
                console.log('Link added:', data)
                console.log(links)
            })
            .catch((e) => {
                console.error('Error posting link:', e)
                toast.error('Failed to add link. Please try again.')
                return
            })
    }

    return (
        <>
            {/*
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white shadow-md mx-auto h-full">
            */}
            <main className="flex flex-col pt-10 items-center h-full">
                <h2 className="text-2xl font-bold mb-4 p-2">Your Links {!isLoggedIn && (<span className="rounded-2xl text-xl p-2 bg-lime-200">as Guest</span>)}</h2>
                <div className="mb-6">
                    <div className="flex gap-2">
                        <Input
                            type="text"
                            placeholder="Enter a new link"
                            value={newLink}
                            onChange={(e) => setNewLink(e.target.value)}
                            className="mb-2 bg-gray-100"
                        />
                        <Button onClick={handleAddLink}>Add Link</Button>
                    </div>
                </div>
                {errors.length > 0 && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">
                        <h3 className="font-semibold">Errors:</h3>
                        <ul className="list-disc pl-5">
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {/* add padding left to each tablecell*/}
                <Table className="shadow-sm shadow-black rounded-md max-w-11/12 mx-auto my-4 w-full text-center">
                    <TableHeader className="bg-gray-200 text-center">
                        <TableRow className="bg-gray-200">
                            <TableHead className="">SHORT</TableHead>
                            <TableHead className="">Status</TableHead>
                            <TableHead className="">URL</TableHead>
                            <TableHead className="">Created At</TableHead>
                            <TableHead className="">Expires At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {links.length ? (
                            links.map((link) => (
                                <TableRow key={link.short}>
                                    <TableCell className="">
                                        <span>
                                            {`${API_URL.replace("/api/v1", "/")}${link.short}`}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="ml-5 select-none"
                                            onClick={() => {
                                                navigator.clipboard.writeText(`${API_URL.replace("/api/v1", "/")}${link.short}`);
                                                toast.success('Short link copied to clipboard');
                                            }}
                                        >
                                            Copy
                                        </Button>
                                    </TableCell>
                                    <TableCell className="">
                                        {link.status ?
                                            (
                                                <div className="flex items-center justify-center">
                                                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                    Active
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center">
                                                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                                    Inactive
                                                </div>
                                            )}
                                    </TableCell>
                                    <TableCell className="max-w-52 overflow-auto overflow-y-hidden">
                                        <a href={link.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                            {link.url}
                                        </a>
                                    </TableCell>
                                    <TableCell className="">{dateToHumanReadable(link.createdAt)}</TableCell>
                                    <TableCell className="">{dateToHumanReadable(link.expiresAt)}</TableCell>
                                    {/* Lest put a mini button to copy to the clipboard on click*/}
                                </TableRow>
                            ))) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </main>
            {/*
        </div>
            */}
        </>

    );
}
